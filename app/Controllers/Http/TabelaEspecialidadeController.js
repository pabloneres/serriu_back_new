'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tabelaespecialidades
 */

const Especialidade = use('App/Models/TabelaEspecialidade')
class TabelaEspecialidadeController {
  /**
   * Show a list of all tabelaespecialidades.
   * GET tabelaespecialidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
   
   const especialidade = await Especialidade.all()

    return especialidade

  }

  /**
   * Render a form to be used for creating a new tabelaespecialidade.
   * GET tabelaespecialidades/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tabelaespecialidade.
   * POST tabelaespecialidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all()

    await Especialidade.create(data)
  }

  /**
   * Display a single tabelaespecialidade.
   * GET tabelaespecialidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tabelaespecialidade.
   * GET tabelaespecialidades/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tabelaespecialidade details.
   * PUT or PATCH tabelaespecialidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.all()

    const especialidade = await Especialidade.findOrFail(params.id)

    especialidade.merge(data) 

    especialidade.save()
  }

  /**
   * Delete a tabelaespecialidade with id.
   * DELETE tabelaespecialidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const especialidade = await Especialidade.findOrFail(params.id)

    await especialidade.delete()
  }
}

module.exports = TabelaEspecialidadeController
