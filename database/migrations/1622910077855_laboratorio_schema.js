'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratorioSchema extends Schema {
  up () {
    this.create('laboratorios', (table) => {
      table.increments()
      table.integer('clinic_id')
      .references('id')
      .inTable('clinics')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('name')
      table.timestamps()
    })
  }

  down () {
    this.drop('laboratorios')
  }
}

module.exports = LaboratorioSchema
