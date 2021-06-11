'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAcessClinicSchema extends Schema {
  up () {
    this.create('user_acess_clinics', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table
      .integer('clinic_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clinics')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_acess_clinics')
  }
}

module.exports = UserAcessClinicSchema
