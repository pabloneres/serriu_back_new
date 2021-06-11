'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TabelaProcedimentoSchema extends Schema {
  up () {
    this.create('tabela_procedimentos', (table) => {
      table.increments()
      table
      .integer('especialidade_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tabela_especialidades')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('tabela_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tabela_precos')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('name', 250)
      table.integer('geral', 2)
      table.float('valor', 8, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('tabela_procedimentos')
  }
}

module.exports = TabelaProcedimentoSchema
