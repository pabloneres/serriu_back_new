'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialidadeNegociacaoSchema extends Schema {
  up() {
    this.create('especialidade_negociacaos', (table) => {
      table.increments()
      table
        .integer('negociacao_id')
        .unsigned()
        .references('id')
        .inTable('negociacaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('especialidade_id')
        .unsigned()
        .references('id')
        .inTable('especialidade_execucaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('pago', 8, 2)
      table.float('restante', 8, 2)

      table.timestamps()
    })
  }

  down() {
    this.drop('especialidade_negociacaos')
  }
}

module.exports = EspecialidadeNegociacaoSchema
