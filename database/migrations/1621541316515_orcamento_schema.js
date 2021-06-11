'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrcamentoSchema extends Schema {
  up () {
    this.create('orcamentos', (table) => {
      table.increments()
      // salvo
      // aprovado
      // andamento
      // executado
      table.string('status')

      table
      .integer('paciente_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('patients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('avaliador')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table
      .integer('clinic_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clinics')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')

      table.string('data_aprovacao', 255)

      table.float('valor', 8, 2)
      table.float('restante', 8, 2)
      table.float('saldo').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('orcamentos')
  }
}

module.exports = OrcamentoSchema
