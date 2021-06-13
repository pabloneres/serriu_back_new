'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipamentoStatusSchema extends Schema {
  up () {
    this.create('equipamento_statuses', (table) => {
      table.increments()
      table.string('espid')
      table.integer('rele1').defaultTo(0)
      table.integer('rele2').defaultTo(0)
      table.integer('rele3').defaultTo(0)
      table.integer('rele4').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('equipamento_statuses')
  }
}

module.exports = EquipamentoStatusSchema