'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentClincSchema extends Schema {
  up () {
    this.create('department_clincs', (table) => {
      table.increments()
      table.integer('clinic_id').references('id').inTable('clinics')
      table.integer('department_id').references('id').inTable('departments')
      table.float('discount')
      table.timestamps()
    })
  }

  down () {
    this.drop('department_clincs')
  }
}

module.exports = DepartmentClincSchema
