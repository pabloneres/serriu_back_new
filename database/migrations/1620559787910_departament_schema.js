'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartamentSchema extends Schema {
  up () {
    this.create('departaments', (table) => {
      table.increments()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down () {
    this.drop('departaments')
  }
}

module.exports = DepartamentSchema
