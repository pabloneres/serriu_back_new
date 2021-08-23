'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comissao extends Model {
  dentista() {
    return this.belongsTo('App/Models/User', 'dentista_id', 'id')
  }

  paciente() {
    return this.belongsTo('App/Models/Patient', 'paciente_id', 'id')
  }

  procedimento() {
    return this.belongsTo('App/Models/ProcedimentoExecucao', 'procedimento_id', 'id')
  }
}

module.exports = Comissao
