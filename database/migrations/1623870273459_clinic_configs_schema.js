'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClinicConfigsSchema extends Schema {
  up () {
    this.create('clinic_configs', (table) => {
      table.increments()
      table.integer('clinic_id').references('id').inTable('clinics').notNullable()
      
      table.boolean('workBoletos').defaultTo(false)
      table.integer('maxParcelas')
      table.float('entMinima', 8, 2)


      table.timestamps()
    })
  }

  down () {
    this.drop('clinic_configs')
  }
}

module.exports = ClinicConfigsSchema
