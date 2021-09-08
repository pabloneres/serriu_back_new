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
      obs,
    } = request.all()

    let pacienteId = undefined

    const agendamento = await Agendamentos.create({
      paciente_id,
      dentista_id,
      clinica_id,
      startDate,
      endDate,
      obs,
    }, trx)


    await trx.commit();

    return agendamento
  }

  async show({ params, request, response, view }) {
  }

  async update({ params, request, response, auth }) {
    const trx = await Database.beginTransaction();

    const data = request.all()
    const old = await Database.table('agendamentos').where('id', params.id).first()

    await Agendamentos.query().where('id', params.id).update({
      ...data,
      type: undefined
    }, trx)

    const newData = await Database.table('agendamentos').where('id', params.id).first()

    console.log(old)

    const log = await AgendamentoLog.create({
      agendamento_id: params.id,
      usuario_id: auth.user.id,
      metodo: 'PUT',
      type: data.type,
      origem: JSON.stringify(old[data.type]),
      final: JSON.stringify(newData[data.type])
    }, trx)

    await trx.commit();

    return log
  }

  async destroy({ params, request, response }) {
    const agendamento = await Agendamentos.findOrFail(params.id)
    await agendamento.delete()
  }
}

module.exports = AgendamentoController
