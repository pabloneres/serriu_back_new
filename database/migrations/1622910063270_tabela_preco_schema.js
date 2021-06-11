'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TabelaPrecoSchema extends Schema {
  up () {
    this.create('tabela_precos', (table) => {
      table.increments()
      table
      .integer('clinic_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clinics')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('name', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('tabela_precos')
  }
}

module.exports = TabelaPrecoSchema
