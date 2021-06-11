'use strict'

const Orcamento = use('App/Models/Orcamento')

class OrcamentoController {

  async index ({ request, response, view, auth }) {
    const orcamento = await Orcamento.all()

    return orcamento
  }

  async store ({ request, response }) {
    const data = request.all()

    const orcamento = await Orcamento.create(data)

    return orcamento
  }

  async show ({ params, request, response, view }) {
  }

  async edit ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = OrcamentoController
