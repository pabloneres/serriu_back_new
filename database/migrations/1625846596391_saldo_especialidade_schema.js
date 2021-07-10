'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SaldoEspecialidadeSchema extends Schema {
  up() {
    this.create('saldo_especialidades', (table) => {
      table.increments()
      table
        .integer('orcamento_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orcamentos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('especialidade_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tabela_especialidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('saldo', 8, 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('saldo_especialidades')
  }
}

module.exports = SaldoEspecialidadeSchema
