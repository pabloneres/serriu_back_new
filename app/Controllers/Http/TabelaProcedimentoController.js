'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tabelaprocedimentos
 */
const Procediemento = use('App/Models/TabelaProcedimento')
class TabelaProcedimentoController {
  /**
   * Show a list of all tabelaprocedimentos.
   * GET tabelaprocedimentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { id } = request.get()

    const procedimentos = await Procediemento.query().where('tabela_id', Number(id))
      .with('especialidade').fetch()

    return procedimentos
  }

  /**
   * Render a form to be used for creating a new tabelaprocedimento.
   * GET tabelaprocedimentos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {

  }

  /**
   * Create/save a new tabelaprocedimento.
   * POST tabelaprocedimentos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all()

    delete data.preco
    await Procediemento.create(data)
  }

  /**
   * Display a single tabelaprocedimento.
   * GET tabelaprocedimentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tabelaprocedimento.
   * GET tabelaprocedimentos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update tabelaprocedimento details.
   * PUT or PATCH tabelaprocedimentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const procedimento = await Procediemento.findOrFail(params.id)

    const data = request.all()

    procedimento.merge({ name: data.name })

    procedimento.save()
  }

  /**
   * Delete a tabelaprocedimento with id.
   * DELETE tabelaprocedimentos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const procediemento = await Procediemento.findOrFail(params.id)

    procediemento.delete()
  }
}

module.exports = TabelaProcedimentoController
