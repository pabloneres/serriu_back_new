'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartamentRoleSchema extends Schema {
  up () {
    this.create('departament_roles', (table) => {
      table.increments()
      table.integer('role_id')
      .references('id')
      .inTable('roles')
      table.integer('departament_id')
      .references('id')
      .inTable('departament')
      table.integer('view').defaultTo(0)
      table.integer('add').defaultTo(0)
      table.integer('edit').defaultTo(0)
      table.integer('delete').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('departament_roles')
  }
}

module.exports = DepartamentRoleSchema
