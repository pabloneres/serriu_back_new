'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EspecialidadeExecucao extends Model {
  procedimentos() {
    return this.hasMany('App/Models/ProcedimentoExecucao', 'especialidade_id', 'especialidade_id')
  }

  especialidade() {
    return this.hasOne('App/Models/TabelaEspecialidade', 'especialidade_id', 'id')
  }

}

module.exports = EspecialidadeExecucao
