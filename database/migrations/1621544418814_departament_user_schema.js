'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartamentUserSchema extends Schema {
  up () {
    this.create('departament_users', (table) => {
      table.increments()
      table.integer('user_id')
      .references('id')
      .inTable('users')
      table.integer('departament_id')
      .references('id')
      .inTable('departaments')
      table.timestamps()
    })
  }

  down () {
    this.drop('departament_users')
  }
}

module.exports = DepartamentUserSchema
