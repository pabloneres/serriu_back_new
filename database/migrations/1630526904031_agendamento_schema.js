'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendamentoSchema extends Schema {
  up() {
    this.create('agendamentos', (table) => {
      table.increments()
      table
        .integer('paciente_id')
        .unsigned()
        // .notNullable()
        .references('id')
        .inTable('patients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('dentista_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('clinica_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clinics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.datetime('startDate')
      table.datetime('endDate')
      table.string('obs')

      table.integer('primeiraConsulta').defaultTo(0)
      // 0 - não 
      // 1 - sim

      table.string('status').defaultTo(0)
      //status 
      //Agendado - 0
      //Confirmado - 1
      //Cancelado - 2
      //Atendido - 3

      table.timestamps()
    })
  }

  down() {
    this.drop('agendamentos')
  }
}

module.exports = AgendamentoSchema
