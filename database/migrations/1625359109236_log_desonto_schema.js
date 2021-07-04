'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogDesontoSchema extends Schema {
  up() {
    this.create('log_desontos', (table) => {
      table.increments()
      table.integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('desconto', 8, 2)

      table.integer('procedimento_id')
        .references('id')
        .inTable('procedimento_execucaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('log_desontos')
  }
}

module.exports = LogDesontoSchema
