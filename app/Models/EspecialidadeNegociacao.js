'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EspecialidadeNegociacao extends Model {
  especialidadeExecucao() {
    return this.belongsTo('App/Models/EspecialidadeExecucao', 'especialidade_id', 'id')
  }
}

module.exports = EspecialidadeNegociacao
