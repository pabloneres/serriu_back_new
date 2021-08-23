'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComissaoConfigSchema extends Schema {
  up() {
    this.create('comissao_configs', (table) => {
      table.increments()

      table
        .integer('dentista_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('clinica_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clinics')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.boolean('recebe_comissao').defaultTo(false)

      table.string('forma_recebimento').defaultTo('procedimento') //orcamento ou procedimento

      table.boolean('necessita_aprovacao').defaultTo(false)

      table.string('funcao').defaultTo('executor')

      table.boolean('executar_sem_saldo').defaultTo(false)

      table.float('vista').defaultTo(0)
      table.float('boleto').defaultTo(0)

      table.timestamps()
    })
  }

  down() {
    this.drop('comissao_configs')
  }
}

module.exports = ComissaoConfigSchema
