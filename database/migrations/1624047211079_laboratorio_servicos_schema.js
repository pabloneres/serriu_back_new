'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LaboratorioServicosSchema extends Schema {
  up () {
    this.create('laboratorio_servicos', (table) => {
      table.increments()
      table.integer('laboratorio_id')
      .references('id')
      .inTable('laboratorios')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.string('name')
      table.float('valor', 8, 2)
      table.timestamps()
    })
  }

  down () {
    this.drop('laboratorio_servicos')
  }
}

module.exports = LaboratorioServicosSchema
