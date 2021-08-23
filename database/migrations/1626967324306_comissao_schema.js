'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComissaoSchema extends Schema {
  up() {
    this.create('comissaos', (table) => {
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

      table
        .integer('orcamento_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orcamentos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('procedimento_id')
        .unsigned()
        .references('id')
        .inTable('procedimento_execucaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('paciente_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('patients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')


      table.string('dente')
      table.float('total')
      table.float('lab')
      table.float('comissao')

      table.boolean('isComissao').defaultTo(false)

      table.string('status') // rejeitado | aprovado | pendente | analise | pago

      table.timestamps()
    })
  }

  down() {
    this.drop('comissaos')
  }
}

module.exports = ComissaoSchema
