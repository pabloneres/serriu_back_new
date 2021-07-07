'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProcedimentoExecucao extends Model {
  dentista() {
    return this.belongsTo('App/Models/User', 'dentista_id', 'id')
  }
  procedimento() {
    return this.belongsTo('App/Models/TabelaProcedimento', 'procedimento_id', 'id')
  }

  procedimentos() {
    return this.belongsTo('App/Models/ProcedimentoExecucao')
      .pivotTable('orcamentos')
  }
}

module.exports = ProcedimentoExecucao
