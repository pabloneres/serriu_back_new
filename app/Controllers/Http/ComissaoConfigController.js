'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with comissaoconfigs
 */
const ComissaoConfig = use('App/Models/ComissaoConfig')

class ComissaoConfigController {
  /**
   * Show a list of all comissaoconfigs.
   * GET comissaoconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new comissaoconfig.
   * GET comissaoconfigs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new comissaoconfig.
   * POST comissaoconfigs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    const data = request.all()

    const comissao = await ComissaoConfig
      .query()
      .where('dentista_id', params.id)
      .andWhere('clinica_id', data.clinica_id)
      .first()

    if (comissao) {
      await ComissaoConfig
        .query()
        .where('dentista_id', params.id)
        .andWhere('clinica_id', data.clinica_id)
        .update(data)

      return
    }

    await ComissaoConfig.create({ ...data, dentista_id: params.id })

  }

  /**
   * Display a single comissaoconfig.
   * GET comissaoconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const { clinica_id } = request.get()
    const comissao = await ComissaoConfig
      .query()
      .where('dentista_id', params.id)
      .andWhere('clinica_id', clinica_id)
      .first()

    if (!comissao) {
      const comissaoCreate = await ComissaoConfig.create({ clinica_id, dentista_id: params.id })

      return comissaoCreate
    }

    return comissao
  }

  /**
   * Render a form to update an existing comissaoconfig.
   * GET comissaoconfigs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update comissaoconfig details.
   * PUT or PATCH comissaoconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a comissaoconfig with id.
   * DELETE comissaoconfigs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = ComissaoConfigController
