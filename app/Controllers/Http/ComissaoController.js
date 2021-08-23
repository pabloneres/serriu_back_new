'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comissaos
 */

const Comissao = use('App/Models/Comissao')
class ComissaoController {
  /**
   * Show a list of all comissaos.
   * GET comissaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { status, clinica_id } = request.get()

    const comissoes = await Comissao.query()
      .where('clinica_id', clinica_id)
      .andWhere('status', status)
      .with('dentista')
      .with('paciente')
      .fetch()

    return comissoes
  }

  /**
   * Render a form to be used for creating a new comissao.
   * GET comissaos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new comissao.
   * POST comissaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
  }

  /**
   * Display a single comissao.
   * GET comissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing comissao.
   * GET comissaos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update comissao details.
   * PUT or PATCH comissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.all()
    await Comissao.query()
      .where('id', params.id)
      .update(data)

    return
  }

  /**
   * Delete a comissao with id.
   * DELETE comissaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ComissaoController
