'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentosNegociacaoSchema extends Schema {
  up() {
    this.create('pagamentos_negociacaos', (table) => {
      table.increments()
      table
        .integer('negociacao_id')
        .unsigned()
        .references('id')
        .inTable('negociacaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('formaPagamento')
      table.string('status')
      table.float('valor', 8, 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('pagamentos_negociacaos')
  }
}

module.exports = PagamentosNegociacaoSchema
