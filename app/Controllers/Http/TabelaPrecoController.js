'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tabelaprecos
 */

const Precos = use('App/Models/TabelaPreco')
class TabelaPrecoController {
  /**
   * Show a list of all tabelaprecos.
   * GET tabelaprecos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { id } = request.get()

    const precos = await Precos.query().where('clinic_id', id).fetch()

    return precos
  }

  /**
   * Render a form to be used for creating a new tabelapreco.
   * GET tabelaprecos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tabelapreco.
   * POST tabelaprecos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all()

    await Precos.create(data)
  }

  /**
   * Display a single tabelapreco.
   * GET tabelaprecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing tabelapreco.
   * GET tabelaprecos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tabelapreco details.
   * PUT or PATCH tabelaprecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const preco = await Precos.findOrFail(params.id)

    const data = request.all()

    preco.merge({name: data.name})

    preco.save()
  }

  /**
   * Delete a tabelapreco with id.
   * DELETE tabelaprecos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const preco = await Precos.findOrFail(params.id)

    preco.delete()
  }
}

module.exports = TabelaPrecoController
