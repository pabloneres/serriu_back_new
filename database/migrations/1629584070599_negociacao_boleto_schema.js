'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NegociacaoBoletoSchema extends Schema {
  up() {
    this.create('negociacao_boletos', (table) => {
      table.increments()
      table
        .integer('negociacao_id')
        .unsigned()
        .references('id')
        .inTable('negociacaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('parcelas')
      table.string('vencimento')
      table.float('entrada', 8, 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('negociacao_boletos')
  }
}

module.exports = NegociacaoBoletoSchema
