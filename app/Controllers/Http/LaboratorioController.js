'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with laboratorios
 */
const Laboratorio = use('App/Models/Laboratorio')
class LaboratorioController {
  /**
   * Show a list of all laboratorios.
   * GET laboratorios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const {clinic_id} = request.get()

    const laboratorio = await Laboratorio.query().where('clinic_id', clinic_id).fetch()

    return laboratorio
  }

  /**
   * Render a form to be used for creating a new laboratorio.
   * GET laboratorios/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new laboratorio.
   * POST laboratorios
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, params }) {
    const data = request.all()

    await Laboratorio.create(data)

    return
  }

  /**
   * Display a single laboratorio.
   * GET laboratorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing laboratorio.
   * GET laboratorios/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update laboratorio details.
   * PUT or PATCH laboratorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a laboratorio with id.
   * DELETE laboratorios/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const lab = await Laboratorio.findOrFail(params.id)

    await lab.delete()
  }
}

module.exports = LaboratorioController
