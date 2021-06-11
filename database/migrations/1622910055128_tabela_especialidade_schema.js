'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TabelaEspecialidadeSchema extends Schema {
  up () {
    this.create('tabela_especialidades', (table) => {
      table.increments()
      table.string('name', 250)
      table.timestamps()
    })
  }

  down () {
    this.drop('tabela_especialidades')
  }
}

module.exports = TabelaEspecialidadeSchema
