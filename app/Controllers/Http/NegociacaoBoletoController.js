'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with negociacaoboletos
 */

const NegociacaoBoleto = use('App/Models/NegociacaoBoleto')
const PagamentosNegociacao = use('App/Models/PagamentosNegociacao')
const EspecialidadeExecucao = use('App/Models/EspecialidadeExecucao')

class NegociacaoBoletoController {
  /**
   * Show a list of all negociacaoboletos.
   * GET negociacaoboletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new negociacaoboleto.
   * GET negociacaoboletos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new negociacaoboleto.
   * POST negociacaoboletos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single negociacaoboleto.
   * GET negociacaoboletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing negociacaoboleto.
   * GET negociacaoboletos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update negociacaoboleto details.
   * PUT or PATCH negociacaoboletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const {
      valorDigitado,
      metodoPagamento,
      especialidades
    } = request.all()

    const negociacao = await NegociacaoBoleto.findBy('negociacao_id', params.id)
    console.log(negociacao)

    const pagamentosNegociacao = await PagamentosNegociacao.create({
      negociacao_id: negociacao.id,
      formaPagamento: metodoPagamento,
      status: 'pago',
      valor: Number(valorDigitado)
    }) // cria pagamento

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

    await NegociacaoBoleto.query()
      .where('negociacao_id', params.id)
      .update({
        entrada: negociacao.entrada + Number(valorDigitado)
      })
  }

  /**
   * Delete a negociacaoboleto with id.
   * DELETE negociacaoboletos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = NegociacaoBoletoController
