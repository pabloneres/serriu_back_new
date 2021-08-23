'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Negociacao extends Model {
  especialidades() {
    return this.hasMany('App/Models/EspecialidadeNegociacao')
  }

  lab() {
    return this.hasOne('App/Models/LabNegociacao')
  }

  pagamentos() {
    return this.hasMany('App/Models/PagamentosNegociacao')
  }

  negociacao_boleto() {
    return this.hasOne('App/Models/NegociacaoBoleto')
  }
}

module.exports = Negociacao
