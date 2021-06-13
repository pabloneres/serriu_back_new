'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipamentosSchema extends Schema {
  up() {
    this.create('equipamentos', (table) => {
      table.increments()
      table.string('espid')
      table.string('ssid')
      table.string('senha')
      table.string('ipv4')
      table.string('gateway')
      table.string('mask')
      table.string('broker_host')
      table.string('broker_user')
      table.string('broker_pass')
      table.string('broker_porta')
      table.string('sensor_rf')
      table.string('controle_rf')
      table.string('sensorRF_status')
      table.string('sensorRF_timeout')
      table.timestamps()
    })
  }

  down() {
    this.drop('equipamentos')
  }
}

module.exports = EquipamentosSchema