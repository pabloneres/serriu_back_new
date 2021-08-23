'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pagamentoorcamentos
 */

const ComissaoConfig = use('App/Models/ComissaoConfig')

const Env = use('Env')

const PagamentoOrcamento = use('App/Models/PagamentoOrcamento')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const Orcamento = use('App/Models/Orcamento')
const BoletosPagamento = use('App/Models/BoletosPagamento')
const FormaPagamento = use('App/Models/FormaPagamento')
const Database = use('Database')
const Assas = use('App/Helpers/assas')
const ComissaoHelper = use('App/Helpers/comissao')
const ComissaoBoleto = use('App/Helpers/comissaoBoleto')
const EspecialidadeHelper = use('App/Helpers/especialidade')
const ClinicConfig = use('App/Models/ClinicConfig')
const Negociacao = use('App/Models/Negociacao')
const EspecialidadeNegociacao = use('App/Models/EspecialidadeNegociacao')
const PagamentosNegociacao = use('App/Models/PagamentosNegociacao')
const PagamentoHelper = use('App/Helpers/pagamento')
const LabNegociacao = use('App/Models/LabNegociacao')


//  const HelpersComissao = use('App/Helpers/comissao')
const moment = require('moment')
require("moment/locale/pt-br")
moment.locale("pt-br");
class PagamentoOrcamentoController {
  /**
   * Show a list of all pagamentoorcamentos.
   * GET pagamentoorcamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new pagamentoorcamento.
   * GET pagamentoorcamentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new pagamentoorcamento.
   * POST pagamentoorcamentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // return request.all()
    const trx = await Database.beginTransaction()
    let {
      condicao,
      orcamento_id,
      procedimento_ids,
      formaPagamento,
      valor,
      especialidades,
      cobranca,
      gerarBoletos
    } = request.all()

    const orcamento = await Orcamento.findBy('id', orcamento_id)

    if (condicao === 'procedimento') {

      let orcamentoRestante = orcamento.restante

      const ids_procedimento = procedimento_ids.map(item => item.id)
      procedimento_ids = procedimento_ids.map(item => {

        orcamentoRestante = Number(orcamentoRestante) - Number(item.valorTotal)
        return {
          orcamento_id,
          procedimento_id: item.id,
          formaPagamento,
          status: 'pago',
          valor: item.valor,
          desconto: item.desconto ? item.desconto : item.valor,
          restanteOrcamento: orcamentoRestante
        }
      })

      const pagamento = await PagamentoOrcamento.createMany(procedimento_ids)

      await ProcedimentoExecucao.query().whereIn('id', ids_procedimento)
        .update({ status_pagamento: 'pago' })

      await Orcamento.query().where('id', orcamento_id).update({
        status: 'andamento',
        saldo: orcamento.saldo + valor,
        restante: orcamento.restante - valor
      })

      ComissaoHelper.executadoProcedimento(orcamento_id, pagamento)

      return pagamento
    }

    ///////////////////////////////////////////////////
    if (condicao === 'total') {
      especialidades = especialidades.filter(item => item.valorAplicado > 0)

      let especiAplicado = []
      let especiSaldo = []

      especialidades = especialidades.forEach(item => {
        especiAplicado.push({
          orcamento_id,
          especialidade_id: item.id,
          formaPagamento,
          status: 'pago',
          valor: item.valor,
          restanteOrcamento: orcamento.restante - valor,
          valorAplicado: item.valorAplicado,
          restante: item.restante ? item.restante - item.valorAplicado : item.valor - item.valorAplicado,
        })

        especiSaldo.push({
          orcamento_id,
          especialidade_id: item.id,
          saldo: item.valorAplicado
        })

      })


      const pagamento = await PagamentoOrcamento.createMany(especiAplicado)

      let saldoEspecialidade = await Database.from('saldo_especialidades').where('orcamento_id', orcamento_id)

      let newSaldo = []

      saldoEspecialidade.forEach((item) => {
        var index = especiSaldo.findIndex(current => current.especialidade_id === item.especialidade_id)

        if (index === -1) {
          return
        }

        especiSaldo[index].saldo = especiSaldo[index].saldo + item.saldo
        especiSaldo[index].id = item.id
      });


      especiSaldo.forEach(async element => {
        try {
          let row = await SaldoEspecialidade.query()
            .where('especialidade_id', element.especialidade_id)
            .andWhere('orcamento_id', element.orcamento_id).first()

          if (row) {
            await SaldoEspecialidade.query()
              .where('id', element.id)
              .update({
                saldo: element.saldo
              }, trx)
            return
          }

          await SaldoEspecialidade.create({
            orcamento_id: element.orcamento_id,
            especialidade_id: element.especialidade_id,
            saldo: element.saldo,
          }, trx)
        } catch (error) {
          console.log(error)
        }
      })

      // return newSaldo
      // await SaldoEspecialidade.createMany(newSaldo)

      // const teste = await ProcedimentoExecucao.query().whereIn('id', ids_procedimento)
      // .update({status: 'pago'})
      await Orcamento.query().where('id', orcamento_id).update({
        status: 'andamento',
        saldo: orcamento.saldo + valor,
        restante: orcamento.restante - valor
      }, trx)

      trx.commit()

      return
    }

    ////////////////////////////////////////////////
    if (condicao === 'boleto') {
      // return especialidades
    }

    const pagamento = await PagamentoOrcamento.create({
      orcamento_id,
      formaPagamento,
      status: 'aguardando',
      valor,
    })

    if (orcamento.valor === pagamento.valor) {
      await Orcamento.query().where('id', orcamento_id).update({
        status: 'pago',
        saldo: valor,
      })
    }
  }

  async boleto({ request, response }) {
    // return request.all()
    const trx = await Database.beginTransaction()
    const {
      orcamento_id,
      valorDigitado,
      procedimentos,
      especialidades,
      lab,
      metodoPagamento,
      gerarBoletos,
      boletoParams,
      valorSelecionado
    } = request.all()

    const returnTotalOuParcial = () => {
      if (Number(valorDigitado) === Number(valorSelecionado)) {
        return 'pago'
      }
      return 'parcial'
    }

    let orcamento = await Orcamento.query().where('id', orcamento_id).first() // buscar orcamento
    orcamento = orcamento.toJSON()

    await Orcamento.query().where('id', orcamento_id).update({
      lab: orcamento.lab + Number(lab),
      restante: orcamento.restante - Number(valorDigitado)
    })

    procedimentos.forEach(async item => {
      try {
        await ProcedimentoExecucao.query().where('id', item).update({
          status_pagamento: returnTotalOuParcial(),
        })
      } catch (error) {
        console.log(error)
      }
    })

    await PagamentoOrcamento.create({
      orcamento_id,
      formaPagamento: boletoParams.metodoPagamento,
      status: 'pago',
      valor: Number(valorDigitado),
    }, trx) // cria pagamento

    if (gerarBoletos) {
      const paciente = await Assas.returnClientOrCreate(orcamento.paciente_id)
      const { installment } = await Assas.createPayment({
        clientID: paciente.id,
        parcelas: boletoParams.parcelas,
        valorParcela: (Number(valor) - Number(boletoParams.entrada)) / boletoParams.parcelas,
        vencimento: boletoParams.vencimento,
        description: boletoParams.descricao,
        externalReference: orcamento_id,
      })

      await Orcamento.query().where('id', orcamento_id).update({
        parcelamento_id: installment,
        carneLink: Env.get('CARNE_URL') + installment.split('_')[1],
        status: 'andamento',
        saldo: orcamento.valor,
        restante: 0
      }, trx)
    } else {
      await Orcamento.query().where('id', orcamento_id).update({
        status: 'andamento',
        saldo: boletoParams.entrada,
        restante: orcamento.valor - boletoParams.entrada
      }, trx)
    } // gerar boletos

    await FormaPagamento.query().where('orcamento_id', orcamento.id).update({
      vencimento: boletoParams.vencimento,
      entrada: boletoParams.entrada,
      parcelas: boletoParams.parcelas
    }, trx) // atualiza os metodos de pagamento

    /////////////////////////////
    await EspecialidadeHelper.updateValues(especialidades, orcamento_id) //atualiza os valores das especialidades
    await ComissaoHelper.comissaoAvaliadorTotal(orcamento, boletoParams.entrada, 0) //cria a comissao do avaliador

    let clinicConfig = await ClinicConfig.query()
      .where('clinic_id', orcamento.clinic_id).first()
    clinicConfig = clinicConfig.toJSON()

    if (!clinicConfig.workBoletos) {
      return
    }

    if (clinicConfig.comissao_boleto === 'orcamento') {
      await EspecialidadeHelper.payComissao(especialidades, orcamento) //paga a comissao
    }

    trx.commit()

    return
  }

  async total({ request, response }) {
    const {
      orcamento_id,
      valorDigitado,
      procedimentos,
      especialidades,
      lab,
      metodoPagamento,
      valorSelecionado
    } = request.all()

    const returnTotalOuParcial = () => {
      if (Number(valorDigitado) === Number(valorSelecionado)) {
        return 'pago'
      }
      return 'parcial'
    }

    let orcamento = await Orcamento.query().where('id', orcamento_id).first()
    orcamento = orcamento.toJSON()

    await Orcamento.query().where('id', orcamento_id).update({
      lab: orcamento.lab + Number(lab),
      restante: orcamento.restante - Number(valorDigitado)
    })

    procedimentos.forEach(async item => {
      try {
        await ProcedimentoExecucao.query().where('id', item).update({
          status_pagamento: returnTotalOuParcial(),
        })
      } catch (error) {
        console.log(error)
      }
    })

    await PagamentoOrcamento.createMany(especialidades.map(item => ({
      orcamento_id,
      especialidade_id: item.id,
      formaPagamento: metodoPagamento,
      status: 'pago',
      valor: valorDigitado,
      restanteOrcamento: orcamento.restante - valorDigitado,
      valorAplicado: Number(item.valorAplicado),
      restante: item.restante - Number(item.valorAplicado)
    }))) //cria os pagamentos

    await EspecialidadeHelper.updateValues(especialidades, orcamento_id) //atualiza os valores das especialidades
    await ComissaoHelper.comissaoAvaliadorTotal(orcamento, valorDigitado, lab) //cria a comissao do avaliador
    await EspecialidadeHelper.payComissao(especialidades, orcamento) //paga a comissao

    return request.all()
  }


  async negociacao({ request, response }) {
    const {
      orcamento_id,
      valorDigitado,
      procedimentos,
      especialidades,
      lab,
      metodoPagamento,
      boleto,
      valorSelecionado
    } = request.all()

    const returnTotalOuParcial = () => {
      if (Number(valorDigitado) === Number(valorSelecionado)) {
        return 'pago'
      }
      return 'parcial'
    } // retorna status | PARCIAL OU TOTAL

    let orcamento = await Orcamento.query().where('id', orcamento_id).first()
    orcamento = orcamento.toJSON() // consulta o orçamento

    await Orcamento.query().where('id', orcamento_id).update({
      lab: orcamento.lab + Number(lab),
      restante: orcamento.restante - Number(valorDigitado)
    }) // atualiza informações no orçamento

    const negociacao = await Negociacao.create({
      orcamento_id: orcamento_id,
      total: valorSelecionado,
      pago: Number(valorDigitado),
      status: returnTotalOuParcial(),
      formaPagamento: boleto ? 'boleto' : 'vista'
    }) // cria a negociação

    const pagamentosNegociacao = await PagamentosNegociacao.create({
      negociacao_id: negociacao.id,
      formaPagamento: metodoPagamento,
      status: 'pago',
      valor: Number(valorDigitado)
    }) // cria o pagamento

    await EspecialidadeHelper.especialidadeNegociacao({
      especialidades,
      orcamento_id,
      negociacao_id: negociacao.id
    }) //cria especialidades vinculadas a negociação

    await LabNegociacao.create({
      negociacao_id: negociacao.id,
      pago: Number(lab.valorAplicado),
      restante: lab.total - Number(lab.valorAplicado)
    })


    procedimentos.forEach(async item => {
      try {
        await ProcedimentoExecucao.query().where('id', item).update({
          status_pagamento: returnTotalOuParcial(),
          negociacao_id: negociacao.id
        })
      } catch (error) {
        console.log(error)
      }
    }) // atualiza os procedimentos

    if (boleto) {
      await PagamentoHelper.boleto({
        negociacao_id: negociacao.id,
        parcelas: boleto.parcelas,
        vencimento: boleto.vencimento,
        entrada: Number(boleto.entrada)
      })
    } // gera as negociações

    await ComissaoHelper.comissaoAvaliadorTotal({
      orcamento,
      valorDigitado,
      lab: Number(lab.valorAplicado),
      boleto,
    }) //cria a comissao do avaliador
    await EspecialidadeHelper.payComissao(especialidades, orcamento) //paga a comissao

  }


  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing pagamentoorcamento.
   * GET pagamentoorcamentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update pagamentoorcamento details.
   * PUT or PATCH pagamentoorcamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a pagamentoorcamento with id.
   * DELETE pagamentoorcamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PagamentoOrcamentoController
