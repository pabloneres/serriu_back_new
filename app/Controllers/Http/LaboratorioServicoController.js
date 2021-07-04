'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with laboratorioservicos
 */
const LaboratorioServico = use('App/Models/LaboratorioServico')
class LaboratorioServicoController {
  /**
   * Show a list of all laboratorioservicos.
   * GET laboratorioservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {laboratorio_id} = request.get()

    const laboratorioservico = await LaboratorioServico.query().where('laboratorio_id', laboratorio_id).fetch()
  
    return laboratorioservico
    
  }

  /**
   * Render a form to be used for creating a new laboratorioservico.
   * GET laboratorioservicos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new laboratorioservico.
   * POST laboratorioservicos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all()

    await LaboratorioServico.create(data)
  }

  /**
   * Display a single laboratorioservico.
   * GET laboratorioservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing laboratorioservico.
   * GET laboratorioservicos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update laboratorioservico details.
   * PUT or PATCH laboratorioservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a laboratorioservico with id.
   * DELETE laboratorioservicos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const service = await LaboratorioServico.findOrFail(params.id)

    await service.delete()
  }
}

module.exports = LaboratorioServicoController
