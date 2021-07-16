'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pagamentoorcamentos
 */

const Env = use('Env')

const PagamentoOrcamento = use('App/Models/PagamentoOrcamento')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const Orcamento = use('App/Models/Orcamento')
const BoletosPagamento = use('App/Models/BoletosPagamento')
const FormaPagamento = use('App/Models/FormaPagamento')
const SaldoEspecialidade = use('App/Models/SaldoEspecialidade')
const Database = use('Database')
const Assas = use('App/Helpers/assas')

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

        console.log(orcamentoRestante)
        console.log(item.valorTotal)

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
      let boleto = []

      // boleto.push({
      //   orcamento_id,
      //   formaPagamento: formaPagamento,
      //   status: 'pago',
      //   valor: Number(cobranca.entrada),
      // })

      ///////////////////////

      // boleto.push({
      //   orcamento_id,
      //   paciente_id: orcamento.paciente_id,
      //   status: gerarBoletos ? 'gerado' : 'salvo',
      //   value: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
      //   vencimento: String(moment(cobranca.vencimento).format()),
      //   description: cobranca.descricao,
      //   numberParcela: 1
      // })

      // for (let index = 1; index < cobranca.parcelas; index++) {
      //   boleto.push({
      //     orcamento_id,
      //     paciente_id: orcamento.paciente_id,
      //     status: gerarBoletos ? 'gerado' : 'salvo',
      //     value: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
      //     vencimento: String(moment(boleto[boleto.length - 1].vencimento).add(30, 'days').format()),
      //     description: cobranca.descricao,
      //     numberParcela: index + 1
      //   })
      // }

      ////////////////////////////

      // return boleto

      const pagamento = await PagamentoOrcamento.create({
        orcamento_id,
        formaPagamento: formaPagamento,
        status: 'pago',
        valor: Number(cobranca.entrada),
      }, trx)

      const boletos = await BoletosPagamento.createMany(boleto, trx)

      // const teste = await ProcedimentoExecucao.query().whereIn('id', ids_procedimento)
      // .update({status: 'pago'})

      if (gerarBoletos) {
        const paciente = await Assas.returnClientOrCreate(orcamento.paciente_id)

        const { installment } = await Assas.createPayment({
          clientID: paciente.id,
          parcelas: cobranca.parcelas,
          valorParcela: (Number(valor) - Number(cobranca.entrada)) / cobranca.parcelas,
          vencimento: cobranca.vencimento,
          description: cobranca.descricao,
          referencia: 'Orçamento Nª' + orcamento_id,
        })

        await Orcamento.query().where('id', orcamento_id).update({
          carneLink: Env.get('CARNE_URL') + installment.split('_')[1],
          status: 'andamento',
          saldo: orcamento.valor,
          restante: 0
        }, trx)
      } else {
        await Orcamento.query().where('id', orcamento_id).update({
          status: 'andamento',
          saldo: cobranca.entrada,
          restante: orcamento.valor - cobranca.entrada
        }, trx)
      }

      await FormaPagamento.query().where('orcamento_id', orcamento.id).update({
        entrada: cobranca.entrada,
        parcelas: cobranca.parcelas
      })


      trx.commit()

      return pagamento
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

  /**
   * Display a single pagamentoorcamento.
   * GET pagamentoorcamentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
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
