'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendaSchema extends Schema {
  up() {
    this.create('agenda', (table) => {
      table.increments()
      table
        .integer('clinica_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clinics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.json('days')
      table.string('start').defaultTo('08:00')
      table.string('end').defaultTo('18:00')
      table.integer('scale').defaultTo(30)
      table.timestamps()
    })
  }

  down() {
    this.drop('agenda')
  }
}

module.exports = AgendaSchema
