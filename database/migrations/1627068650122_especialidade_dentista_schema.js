'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialidadeDentistaSchema extends Schema {
  up() {
    this.create('especialidade_dentistas', (table) => {
      table.increments()

      table
        .integer('dentista_id')
        .unsigned()
        .notNullable()
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

      table
        .integer('especialidade_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tabela_especialidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('boleto', 8, 2).defaultTo(0)
      table.float('vista', 8, 2).defaultTo(0)

      table.timestamps()
    })
  }

  down() {
    this.drop('especialidade_dentistas')
  }
}

module.exports = EspecialidadeDentistaSchema
