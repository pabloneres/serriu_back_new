'use strict'

const Database = use('Database')
const Orcamento = use('App/Models/Orcamento')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const FormaPagamento = use('App/Models/FormaPagamento')
const Helpers = use('App/Helpers/orcamento')

class OrcamentoController {

  async index({ request, response, view, auth }) {
    const { paciente_id, status, returnType } = request.get()

    if (returnType) {
      const orcamento = await Orcamento.query()
        .where('paciente_id', paciente_id)
        .with('procedimentos', builder => {
          builder
            .with('dentista', builder => {
              builder.select('id', 'firstName', 'lastName')
            })
            .with('procedimento', builder => {
              builder.select('id', 'name')
            })
        })
        .with('pagamento')
        .with('pagamentos', builder => {
          builder.with('especialidades')
          builder.with('procedimentos')
        })
        .with('boletos')
        .orderBy('id', 'desc')
        .fetch()

      return orcamento
    }

    if (status) {
      const orcamentos = await Orcamento.query()
        .where('paciente_id', paciente_id)
        .andWhere('status', status)
        .withCount('procedimentos as total_procedimentos')
        .fetch()

      return orcamentos
    }

    const orcamentos = await Orcamento.query()
      .where('paciente_id', paciente_id)
      .withCount('procedimentos as total_procedimentos')
      .orderBy('id', 'desc')
      .fetch()

    return orcamentos
  }

  async store({ request, response }) {
    // return request.all()
    const trx = await Database.beginTransaction();
    let data = request.all()

    const procedimentos = Helpers.procedimentoHelper(data.procedimentos)
    const orcamento = Helpers.orcamentoHelper(data)
    const pagamento = Helpers.pagamentoHelper(data.pagamento)

    // return {procedimentos, orcamento, pagamento}

    let saveOrcamento = {
      ...orcamento,
      valor: procedimentos.reduce((a, b) => a + b.valor, 0),
      restante: procedimentos.reduce((a, b) => a + b.valor, 0),
      avaliador: data.avaliador,
      valorDesconto: procedimentos.reduce((a, b) => a + b.valor, 0)
    }
    saveOrcamento = await Orcamento.create(saveOrcamento, trx)


    let saveProcedimento = procedimentos.map(item => ({
      ...item,
      desconto: item.valor,
      orcamento_id: saveOrcamento.id
    }))
    saveProcedimento = await ProcedimentoExecucao.createMany(saveProcedimento, trx)


    let savePagamento = {
      ...pagamento,
      orcamento_id: saveOrcamento.id
    }
    savePagamento = await FormaPagamento.create(savePagamento, trx)

    await trx.commit();
  }

  async show({ params, request, response, view }) {
    const orcamento = await Orcamento.query()
      .where('id', params.id)
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
      .first()

    return orcamento
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = OrcamentoController
