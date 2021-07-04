'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with procedimentoexecucaos
 */
const ProcedimentoExecucao = use('App/Models/ProcedimentoExecucao')
const User = use('App/Models/User')
const Orcamento = use('App/Models/Orcamento')
const DepartmentClinc = use('App/Models/DepartmentClinc')

class ProcedimentoExecucaoController {
  async index({ request, response, view }) {
  }

  async create({ request, response, view }) {
  }

  async store({ request, response }) {
    // return request.all()
    const data = request.all()

    const user = await User.findBy('code', data.passwordCode)

    if (!user) {
      response.status(401).send({ message: 'Acesso negado' })
    }

    const orcamento = await Orcamento.findBy('id', data.orcamento_id)

    const diff = data.valor - Number(data.valorTotal)
    const porcentagem = ((diff * 100) / data.valor).toFixed(1)

    const department = await user.department().first()

    const descontoPermitido = await DepartmentClinc
      .query()
      .where('clinic_id', orcamento.clinic_id)
      .andWhere('department_id', department.id).first()

    const permitido = descontoPermitido.discount >= porcentagem

    if (!permitido) {
      response.status(401).send({ message: 'Desconto não autorizado' })
    }

    const procedimento = await ProcedimentoExecucao.query().where('id', data.id).update({
      desconto: Number(data.valorTotal)
    })

    return procedimento

  }

  async show({ params, request, response, view }) {
  }

  async edit({ params, request, response, view }) {
  }

  async update({ params, request, response }) {
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = ProcedimentoExecucaoController
