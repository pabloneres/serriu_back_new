'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspecialidadeExecucaoSchema extends Schema {
  up() {
    this.create('especialidade_execucaos', (table) => {
      table.increments()

      table.integer('orcamento_id')
        .references('id')
        .inTable('orcamentos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('especialidade_id')
        .unsigned()
        .references('id')
        .inTable('tabela_especialidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('titular')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('valor', 8, 2)
      table.float('restante', 8, 2)
      table.float('saldoComissao', 8, 2).defaultTo(0)
      table.float('saldo', 8, 2).defaultTo(0)

      table.timestamps()
    })
  }

  down() {
    this.drop('especialidade_execucaos')
  }
}

module.exports = EspecialidadeExecucaoSchema
