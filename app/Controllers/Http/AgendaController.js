'use strict'

const Agenda = use('App/Models/Agenda')
const Database = use('Database')

class AgendaController {

  async index({ request, response, view, auth }) {
    const clinic_id = request.get()
    let agenda = await Agenda.query().where('clinica_id', clinic_id).first()

    return agenda
  }

  async store({ request, response, auth }) {
    const { days } = request.all()

    let day = JSON.stringify(days)

    const agenda = await Agenda.create({
      days: day,
      clinica_id: auth.user.id
    })

    return agenda
  }

  async show({ params, request, response, view }) {
    let agenda = await Agenda.query().where('clinica_id', params.id).first()

    return agenda
  }

  async update({ params, request, response, auth }) {
    const trx = await Database.beginTransaction();

    const { days, scale } = request.all()

    let dayOrder = days
    let dayStart = days
    let dayEnd = days

    // if (days) {
    //   dayOrder 
    // }

    if (days) {
      let ordenedDaysStart = dayStart.sort((a, b) => {
        return a.start < b.start ? -1 : a.start > b.start ? 1 : 0;
      })

      let ordenedDaysEnd = dayEnd.sort((a, b) => {
        return a.end < b.end ? -1 : a.end > b.end ? 1 : 0;
      })

      console.log(ordenedDaysStart[0].start)
      console.log(ordenedDaysEnd[ordenedDaysEnd.length - 1].end)

      const agenda = await Agenda.query().where('clinica_id', auth.user.id).update({
        start: ordenedDaysStart[0].start,
        end: ordenedDaysEnd[ordenedDaysEnd.length - 1].end,
        days: JSON.stringify(dayOrder.sort((a, b) => {
          return a.day < b.day ? -1 : a.day > b.day ? 1 : 0;
        })),
      }, trx)
      await trx.commit();

      return agenda
    }

    const agenda = await Agenda.query().where('clinica_id', auth.user.id).update({
      scale
    }, trx)
    await trx.commit();

    return agenda
  }

  async destroy({ params, request, response }) {
  }
}

module.exports = AgendaController
