'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
        table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        table.string('avatar_url', 254)
        table.string('cpf', 254).notNullable().unique()
        table.string('rg', 254).notNullable().unique()
        table.string('gender', 254).notNullable()
        table.string('birth', 254).notNullable()
        table.string('marital_status', 254).notNullable()
        table.string('schooling', 254)
        table.string('tel', 254).notNullable().unique()
        table.string('croUF', 254)
        table.string('croNumber', 254)
        table.string('scheduleView', 254)
        table.string('scheduleColor', 254)
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
