'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquipamentosSchema extends Schema {
  up() {
    this.create('equipamentos', (table) => {
      table.increments()
      table.string('espid')
      table.string('log')
      table.string('versao')
      table.string('ssid')
      table.string('senha')
      table.string('ipv4')
      table.string('gateway')
      table.string('mask')
      table.string('broker_host')
      table.string('broker_user')
      table.string('broker_pass')
      table.string('broker_porta')
      table.string('broker_t_send')
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

// { "espid"
//   "log" 
//   "versao"
//   "ssid"
//   "senha"
//   "ipv4"
//   "gateway"
//   "mask"
//   "broker_host"
//   "broker_user"
//   "broker_pass"
//   "broker_porta"
//   "broker_t_send"
//   "sensor_rf"
//   "controle_rf"
//   "sensorRF_status"
//   "sensorRF_timeout" }