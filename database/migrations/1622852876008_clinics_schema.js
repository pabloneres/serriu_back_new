'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClinicsSchema extends Schema {
  up () {
    this.create('clinics', (table) => {
      table.increments()
      table.string('name', 250)
      table.string('name_fantasy', 254)
      table.string('email', 254)
      table.string('tel', 60).unique()
      table.string('register', 60).unique()
      table.string('address', 60)
      table.string('uf', 60)
      table.string('city', 60)
      table.timestamps()
    })
  }

  down () {
    this.drop('clinics')
  }
}

module.exports = ClinicsSchema
