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
      .with('dentista')
      .fetch()

    return agendamentos
  }

  async store({ request, response, auth }) {
    const trx = await Database.beginTransaction();
    const { paciente_id,
      dentista_id,
      startDate,
      endDate,
      obs,
      pacienteData,
      status
    } = request.all()

    let pacienteId = undefined

    // if (pacienteData) {
    //   let [{ 'max(`id_acesso`)': max }] = await Database.from('patients').max('id_acesso')

    //   if (!max) {
    //     data.id_acesso = 100000
    //     max = 100000
    //   }

    //   pacienteId = await Patient.create({
    //     id_acesso: max + 1,
    //     user_id: auth.user.id,
    //     name: pacienteData.nome,
    //     email: pacienteData.email,
    //     tel: pacienteData.telefone,
    //   }, trx)
    // }

    const agendamento = await Agendamentos.create({
      paciente_id: pacienteId ? pacienteId.id : paciente_id,
      dentista_id,
      clinica_id: auth.user.id,
      startDate,
      endDate,
      obs,
      status
    }, trx)

    // const log = await AgendamentoLog.create({
    //   agendamento_id: agendamento.id,
    //   usuario_id: auth.user.id,
    //   metodo: 'STORE',
    //   type: 'Agendamento',
    // }, trx)

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
