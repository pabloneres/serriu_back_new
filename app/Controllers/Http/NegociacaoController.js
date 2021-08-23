'use strict'

const Negociacao = use('App/Models/Negociacao')
const EspecialidadeNegociacao = use('App/Models/EspecialidadeNegociacao')
const EspecialidadeExecucao = use('App/Models/EspecialidadeExecucao')
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const Orcamento = use('App/Models/Orcamento')
const PagamentosNegociacao = use('App/Models/PagamentosNegociacao')
const ComissaoHelper = use('App/Helpers/comissao')
const NegociacaoBoleto = use('App/Models/NegociacaoBoleto')
const LabNegociacao = use('App/Models/LabNegociacao')
const EspecialidadeHelper = use('App/Helpers/especialidade')

class NegociacaoController {

  async index({ request, response, view }) {
  }
  async store({ request, response, params }) {
  }
  async show({ params, request, response, view }) {
    const negociacao = await Negociacao
      .query()
      .where('id', params.id)
      .with('pagamentos')
      .with('especialidades', especialidades => {
        especialidades
          .with('especialidadeExecucao', especialidadeExecucao => {
            especialidadeExecucao.with('especialidade')
          })
      })
      .with('lab')
      .with('negociacao_boleto')
      .first()

    return negociacao
  }

  async update({ params, request, response }) {
    const {
      valorDigitado,
      especialidades,
      lab,
      metodoPagamento,
      boleto,
      addEntrada
    } = request.all()

    let negociacao = await Negociacao
      .query()
      .where('id', params.id)
      .first()
    negociacao = negociacao.toJSON() //consulta a negociação

    let orcamento = await Orcamento.query()
      .where('id', negociacao.orcamento_id)
      .first()
    orcamento = orcamento.toJSON() // consulta o orçmento

    const returnStatus = () => {
      if (negociacao.pago + Number(valorDigitado) === negociacao.total) {
        return 'pago'
      }
      return 'parcial'
    } // retorna o status da negociação de acordo com o valor

    await Negociacao
      .query()
      .where('id', params.id)
      .update({
        pago: negociacao.pago + Number(valorDigitado),
        status: returnStatus()
      }) // atualiza a negociação


    const pagamentosNegociacao = await PagamentosNegociacao.create({
      negociacao_id: negociacao.id,
      formaPagamento: metodoPagamento,
      status: 'pago',
      valor: Number(valorDigitado)
    }) // cria pagamento

    if (returnStatus() === 'pago') {
      await ProcedimentoExecucao
        .query()
        .where('negociacao_id', params.id)
        .update({
          status_pagamento: 'pago'
        })
    } // se o status da negocição for igual o a pago ele atualiza o status dos procedimentos 

    especialidades.forEach(async item => {
      try {
        let especialidade = await EspecialidadeExecucao
          .query()
          .where('id', item.especialidade_id)
          .first()
        especialidade = especialidade.toJSON()

        await EspecialidadeNegociacao.query()
          .where('id', item.id)
          .update({
            pago: item.pago + Number(item.valorAplicado),
            restante: item.restante - Number(item.valorAplicado),
          }) // atualiza as especialidades da negociacao

        await EspecialidadeExecucao
          .query()
          .where('id', especialidade.id)
          .update({
            restante: especialidade.restante - Number(item.valorAplicado),
            saldo: especialidade.saldo + Number(item.valorAplicado),
            saldoComissao: especialidade.saldoComissao + Number(item.valorAplicado),
          })  // adiciona os valores as especialidades do orçamento

      } catch (error) {
        console.error(error)
      }
    }) // atualiza as especialidades vinculadas a negociação

    if (lab) {
      let labQuery = await LabNegociacao.findBy('negociacao_id', negociacao.id)

      if (labQuery) {
        await LabNegociacao.query().where('negociacao_id', negociacao.id).update({
          pago: labQuery.pago + Number(lab),
          restante: labQuery.restante - Number(lab),
        })
      }
    } // atualiza os valores de laboratorio


    await Orcamento.query()
      .where('id', negociacao.orcamento_id)
      .update({
        restante: orcamento.restante - Number(valorDigitado)
      }) // atualiza o valor restante do orcamento

    if (addEntrada) {
      const negociacaoBoleto = await NegociacaoBoleto.findBy('negociacao_id', params.id)

      await NegociacaoBoleto.query()
        .where('negociacao_id', params.id)
        .update({
          entrada: negociacaoBoleto.entrada + Number(valorDigitado)
        }) // adiciona entrada
    }

    await ComissaoHelper.comissaoAvaliadorTotal({
      orcamento,
      valorDigitado,
      lab,
      boleto,
    }) //cria a comissao do avaliador

    await EspecialidadeHelper.payComissao(especialidades, orcamento) //paga a comissao


    return negociacao
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = NegociacaoController
