'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EspecialidadeDentista extends Model {
  especialidade() {
    return this.belongsTo('App/Models/TabelaEspecialidade', 'especialidade_id', 'id')
  }
}

module.exports = EspecialidadeDentista