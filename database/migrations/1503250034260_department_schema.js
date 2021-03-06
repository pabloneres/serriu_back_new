'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up() {
    this.create('departments', (table) => {
      table.string('id').primary()
      table.string('name')
      table.string('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('departments')
  }
}

module.exports = DepartmentSchema
