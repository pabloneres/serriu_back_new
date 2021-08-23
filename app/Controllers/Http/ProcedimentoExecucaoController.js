'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with procedimentoexecucaos
 */
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const User = use('App/Models/User')
const Orcamento = use('App/Models/Orcamento')
const DepartmentClinc = use('App/Models/DepartmentClinc')
const Database = use('Database')
const ComissaoHelper = use('App/Helpers/comissao')
const EspecialidadeHelper = use('App/Helpers/especialidade')
const ClinicConfig = use('App/Models/ClinicConfig')
const FormaPagamento = use('App/Models/FormaPagamento')
const ComissaoBoleto = use('App/Helpers/comissaoBoleto')
const Negociacao = use('App/Models/Negociacao')

class ProcedimentoExecucaoController {
  async index({ request, response, view }) {
    const { status, paciente_id } = request.get()

    const procedimentos = await Orcamento.query()
      .where('paciente_id', paciente_id)
      .with('procedimentos', builder => {
        builder
          .with('dentista', builder => {
            builder.select('id', 'firstName', 'lastName')
          })
          .with('procedimento.especialidade', builder => {
            builder.select('id', 'name')
          })
          .orderBy('id', 'cres')
      })
      .with('pagamento')
      .with('pagamentos.especialidades')
      .with('saldoEspecialidade')
      .with('boletos', builder => {
        builder.orderBy('invoiceNumber', 'cres')
      })
      .orderBy('id', 'desc')
      .fetch()

    // .with('procedimentos', builder => {
    //   builder
    //     .with('dentista', builder => {
    //       builder.select('id', 'firstName', 'lastName')
    //     })
    //     .with('procedimento.especialidade', builder => {
    //       builder.select('id', 'name')
    //     })
    //     .orderBy('id', 'cres')
    // })
    // .with('pagamento')
    // .with('pagamentos.especialidades')

    return procedimentos
  }

  async create({ request, response, view }) {
  }

  async store({ request, response }) {
    // return request.all()
    const data = request.all()

    const user = await User.findBy('code', data.passwordCode)

    if (!user) {
      response.status(401).send({ message: 'Acesso negado' })
    }

    const orcamento = await Orcamento.findBy('id', data.orcamento_id)

    const diff = data.valor - Number(data.valorTotal)
    const porcentagem = ((diff * 100) / data.valor).toFixed(1)

    const department = await user.department().first()

    const descontoPermitido = await DepartmentClinc
      .query()
      .where('clinic_id', orcamento.clinic_id)
      .andWhere('department_id', department.id).first()

    const permitido = descontoPermitido.discount >= porcentagem

    if (!permitido) {
      response.status(401).send({ message: 'Desconto não autorizado' })
      return
    }

    await Orcamento.query().where('id', orcamento.id).update({
      restante: orcamento.restante - diff,
      valorDesconto: orcamento.valorDesconto - diff
    })

    const procedimento = await ProcedimentoExecucao.query().where('id', data.id).update({
      desconto: Number(data.valorTotal)
    })

    return procedimento

  }

  async show({ params, request, response, view }) {
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
    // return request.all()
    const trx = await Database.beginTransaction();
    const data = request.all()

    let orcamento = await Orcamento.query().where('id', data.orcamento_id).first() //busca o orcamento
    orcamento = orcamento.toJSON()

    let procedimento = await ProcedimentoExecucao.query()
      .where('id', data.procedimento_id)
      .with('procedimento')
      .first()
    procedimento = procedimento.toJSON() // busca o procedimento a executar

    let clinicConfig = await EspecialidadeHelper.clinicConfig(orcamento.clinic_id) // busca a configuração da clinica

    let negociacao = await Negociacao.query().where('id', procedimento.negociacao_id).first()  // busca a negociação
    negociacao = negociacao.toJSON()

    if (negociacao.formaPagamento === 'boleto' && clinicConfig.comissao_boleto === 'orcamento') {
      await EspecialidadeHelper.verifyTitularBoletoOrcamento({
        orcamento: orcamento,
        especialidade_id: procedimento.especialidade_id,
        dentista_id: data.dentista_id
      })
    } else {
      await EspecialidadeHelper.verifyTitularBoleto({
        orcamento: orcamento,
        especialidade_id: procedimento.especialidade_id,
        dentista_id: data.dentista_id
      }) // se não tiver um titular na especialidade ele adiciona um titular
    }

    let sobra = Number(orcamento.saldo) - Number(procedimento.desconto) // restante do orcamento

    await Orcamento.query().where('id', orcamento.id).update({
      saldo: sobra
    }, trx) // atualiza o restante do orçamento


    await ProcedimentoExecucao.query().where('id', procedimento.id).update({
      status_execucao: 'executado',
      detalhes: data.detalhes
    }, trx) // atualiza o status de execução do procedimento

    //////////////////////

    if (negociacao.formaPagamento === 'boleto') { // se a negociação for via boleto
      if (!clinicConfig.workBoletos) {
        return
      } // se a negociação for via boleto e a clinica nao trabalha com boletos ele para a função

      if (clinicConfig.comissao_boleto === 'procedimento') {
        await ComissaoHelper.executadoProcedimento({
          procedimento,
          orcamento,
          isBoleto: true,
          formaPagamento: negociacao.formaPagamento
        })
      }
      if (clinicConfig.comissao_boleto === 'concluido') {
        await ComissaoHelper.executadoProcedimento({
          procedimento,
          orcamento,
          isBoleto: true,
          formaPagamento: negociacao.formaPagamento
        })
      }
    } else {
      await ComissaoHelper.executadoProcedimento({
        procedimento,
        orcamento,
        isBoleto: false,
        formaPagamento: negociacao.formaPagamento
      }) // se nao for via boleto, ele executa a função para pagar comissao do executor
    }

    await EspecialidadeHelper.updateValuesExecutado({
      especialidade_id: procedimento.especialidade_id,
      orcamento,
      procedimento
    })

    trx.commit()

  }

  async destroy({ params, request, response }) {
    let procedimento = await ProcedimentoExecucao.query()
      .where('id', params.id).first()
    procedimento = procedimento.toJSON()

    let orcamento = await Orcamento.query()
      .where('id', procedimento.orcamento_id).first()
    orcamento = orcamento.toJSON()

    await ProcedimentoExecucao.query()
      .where('id', params.id).delete()

    await Orcamento.query()
      .where('id', orcamento.id).update({
        valor: orcamento.valor - procedimento.valor,
        valorDesconto: orcamento.valorDesconto - procedimento.valor,
        restante: orcamento.restante - procedimento.valor
      })
  }
}

module.exports = ProcedimentoExecucaoController
