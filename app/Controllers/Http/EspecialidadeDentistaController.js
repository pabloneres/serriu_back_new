'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with especialidadedentistas
 */

const EspecialidadeDentista = use('App/Models/EspecialidadeDentista')

class EspecialidadeDentistaController {
  /**
   * Show a list of all especialidadedentistas.
   * GET especialidadedentistas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { clinica_id, dentista_id } = request.get()

    const especialidades = await EspecialidadeDentista
      .query()
      .where('clinica_id', clinica_id)
      .andWhere('dentista_id', dentista_id)
      .with('especialidade')
      .fetch()

    return especialidades
  }

  /**
   * Render a form to be used for creating a new especialidadedentista.
   * GET especialidadedentistas/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new especialidadedentista.
   * POST especialidadedentistas
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    const data = request.all()

    await EspecialidadeDentista.create({
      dentista_id: params.id,
      clinica_id: data.clinica_id,
      especialidade_id: data.especialidade_id,
      boleto: data.boleto,
      vista: data.vista
    })
  }

  /**
   * Display a single especialidadedentista.
   * GET especialidadedentistas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing especialidadedentista.
   * GET especialidadedentistas/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update especialidadedentista details.
   * PUT or PATCH especialidadedentistas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a especialidadedentista with id.
   * DELETE especialidadedentistas/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = EspecialidadeDentistaController
