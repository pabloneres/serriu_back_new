'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agendamento extends Model {
  dentista() {
    return this.belongsTo('App/Models/User', 'dentista_id', 'id')
  }
  paciente() {
    return this.belongsTo('App/Models/Patient', 'paciente_id', 'id')
  }
  // agendamento_logs() {
  //     return this.hasMany('App/Models/AgendamentoLog')
  // }
}

module.exports = Agendamento
