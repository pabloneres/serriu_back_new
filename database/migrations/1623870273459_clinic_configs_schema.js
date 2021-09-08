'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClinicConfigsSchema extends Schema {
  up() {
    this.create('clinic_configs', (table) => {
      table.increments()
      table.integer('clinic_id')
        .references('id')
        .inTable('clinics')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.boolean('workBoletos').defaultTo(false)
      table.boolean('comissoes_zeradas').defaultTo(false)
      table.integer('maxParcelas')

      table.string('comissao_boleto')

      table.float('entMinima', 8, 2)


      table.timestamps()
    })
  }

  down() {
    this.drop('clinic_configs')
  }
}

module.exports = ClinicConfigsSchema
