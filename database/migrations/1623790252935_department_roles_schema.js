'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentRolesSchema extends Schema {
  up () {
    this.create('department_roles', (table) => {
      table.integer('department_id').primary().references('id').inTable('departments')
      table.string('role_id').references('id').inTable('roles')
      table.boolean('view')
      table.boolean('add')
      table.boolean('edit')
      table.boolean('delete')
      table.boolean('permissions')
      table.timestamps()
    })
  }

  down () {
    this.drop('department_roles')
  }
}

module.exports = DepartmentRolesSchema
