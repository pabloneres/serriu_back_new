'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MetodosPagamentoSchema extends Schema {
  up() {
    this.create('metodos_pagamentos', (table) => {
      table.increments()
      table.string('name')
      table.string('value')
      table.timestamps()
    })
  }

  down() {
    this.drop('metodos_pagamentos')
  }
}

module.exports = MetodosPagamentoSchema
