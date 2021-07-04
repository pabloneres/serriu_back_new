'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PagamentoOrcamento extends Model {
  procedimentos() {
    return this.hasOne('App/Models/ProcedimentoExecucao', 'procedimento_id', 'id')
  }

  especialidades() {
    return this.hasOne('App/Models/TabelaEspecialidade', 'especialidade_id', 'id')
  }
}

module.exports = PagamentoOrcamento
