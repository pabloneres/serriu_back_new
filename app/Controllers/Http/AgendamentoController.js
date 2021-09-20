'use strict'

const Agendamentos = use('App/Models/Agendamento')
const Database = use('Database')
const Patient = use('App/Models/Patient')

class AgendamentoController {

  async index({ request, response, view, auth }) {
    let { clinica_id } = request.get()

    // if (clinica_id != 0) {
    //   const agendamentos = await Agendamentos.query()
    //     .where('clinica_id', clinica_id)
    //     .with('paciente')
    //     .with('dentista')
    //     .fetch()

    //   return agendamentos
    // }

    const agendamentos = await Agendamentos.query()
      .where('clinica_id', clinica_id)
      .with('paciente')
      .with('dentista', dentista => {
        dentista.with('profile')
      })
      .fetch()

    return agendamentos
  }

  async store({ request, response, auth }) {
    const trx = await Database.beginTransaction();
    const {
      paciente_id,
      dentista_id,
      clinica_id,
      startDate,
      endDate,
      tipo,
      status,
      obs,
    } = request.all()

    let pacienteId = undefined

    const agendamento = await Agendamentos.create({
      paciente_id,
      dentista_id,
      clinica_id,
      startDate,
      endDate,
      tipo,
      status,
      obs,
    }, trx)


    await trx.commit();

    return agendamento
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response, auth }) {

    const data = request.all()

    await Agendamentos.query().where('id', params.id).update({
      ...data,
    })

    return
  }

  async destroy({ params, request, response }) {
    const agendamento = await Agendamentos.findOrFail(params.id)
    await agendamento.delete()
  }
}

module.exports = AgendamentoController
