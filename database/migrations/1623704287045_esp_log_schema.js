'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EspLogSchema extends Schema {
  up () {
    this.create('esp_logs', (table) => {
      table.increments()
      table.string('data')
      table.string('espid')
      table.string('owner')
      table.string('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('esp_logs')
  }
}

module.exports = EspLogSchema
