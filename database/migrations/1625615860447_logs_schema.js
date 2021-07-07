'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogsSchema extends Schema {
  up() {
    this.create('logs', (table) => {
      table.increments()

      table.integer('user_logado')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('user_permissao')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('action')

      table.string('description')

      table.integer('orcamento_id')
        .references('id')
        .inTable('orcamentos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('procedimento_id')
        .references('id')
        .inTable('procedimento_execucaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamps()
    })
  }

  down() {
    this.drop('logs')
  }
}

module.exports = LogsSchema
