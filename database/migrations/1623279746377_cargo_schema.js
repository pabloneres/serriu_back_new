'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CargoSchema extends Schema {
  up () {
    this.create('cargos', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('cargos')
  }
}

module.exports = CargoSchema
