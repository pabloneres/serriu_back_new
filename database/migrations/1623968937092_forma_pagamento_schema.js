'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FormaPagamentoSchema extends Schema {
  up () {
    this.create('forma_pagamentos', (table) => {
      table.increments()
      table.integer('orcamento_id')
      .references('id')
      .inTable('orcamentos')
      .notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      // //total
      // //procedimento
      // table.string('cobranca')

      // total
      // parcelado
      // procedimento
      table.string('condicao')
      table.float('entrada', 8, 2)
      table.integer('parcelas')
      table.timestamps()
    })
  }

  down () {
    this.drop('forma_pagamentos')
  }
}

module.exports = FormaPagamentoSchema
