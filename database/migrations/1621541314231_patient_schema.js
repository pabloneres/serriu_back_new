'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PatientSchema extends Schema {
  up() {
    this.create('patients', (table) => {
      table.increments()
      table.string('firstName', 250).notNullable()
      table.string('lastName', 250).notNullable()
      table
        .integer('clinic_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clinics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('cpf', 250).unique()
      table.string('rg', 250).unique()

      table.string('avatar_url')

      table.string('rg_file', 250)
      table.string('cpf_file', 250)
      table.string('address_file', 250)

      table.integer('email_verified').defaultTo(0)
      table.integer('cpf_verified').defaultTo(0)
      table.integer('rg_verified').defaultTo(0)
      table.integer('address_verified').defaultTo(0)
      table.integer('tel_verified').defaultTo(0)

      table.string('address', 250)
      table.string('uf', 250)
      table.string('city', 250)
      table.string('birth', 250)
      table.string('email', 254).unique()
      table.string('gender', 254)
      table.string('tel', 254)
      table.string('marital_status', 254)
      table.string('status', 254)
      table.string('schooling', 254)
      table.timestamps()
    })
  }

  down() {
    this.drop('patients')
  }
}

module.exports = PatientSchema


