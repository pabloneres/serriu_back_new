'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReleStatuSchema extends Schema {
  up () {
    this.create('rele_status', (table) => {
      table.increments()
      table.string('rele1').defaultTo(0)
      table.string('rele2').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('rele_status')
  }
}

module.exports = ReleStatuSchema
