'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDepartmentSchema extends Schema {
  up () {
    this.create('user_departments', (table) => {
      table.increments()
      table.integer('user_id').references('id').inTable('users')
      table.integer('department_id').references('id').inTable('departments')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_departments')
  }
}

module.exports = UserDepartmentSchema
