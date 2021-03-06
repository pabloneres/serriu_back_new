'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormaPagamentoSchema extends Schema {
  up() {
    this.create('forma_pagamentos', (table) => {
      table.increments()
      table.integer('negociacao_id')
        .references('id')
        .inTable('negociacaos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('condicao')
      table.float('entrada', 8, 2)
      table.integer('parcelas')
      table.string('vencimento')
      table.timestamps()
    })
  }

  down() {
    this.drop('forma_pagamentos')
  }
}

module.exports = FormaPagamentoSchema
