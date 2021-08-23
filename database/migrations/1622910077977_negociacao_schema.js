'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NegociacaoSchema extends Schema {
  up() {
    this.create('negociacaos', (table) => {
      table.increments()

      table.integer('orcamento_id')
        .references('id')
        .inTable('orcamentos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('total', 8, 2)
      table.float('pago', 8, 2)
      table.string('status')
      table.string('formaPagamento')

      table.timestamps()
    })
  }

  down() {
    this.drop('negociacaos')
  }
}

module.exports = NegociacaoSchema
