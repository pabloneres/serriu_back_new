'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoletosPagamentoSchema extends Schema {
  up() {
    this.create('boletos_pagamentos', (table) => {
      table.increments()

      table.integer('orcamento_id')
        .references('id')
        .inTable('orcamentos')
        .notNullable()
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

      table.string('status')
      table.float('value', 8, 2)
      table.string('vencimento')
      table.string('description')

      table.string('numberParcela')



      table.float('fatura_id', 8, 2)

      table.string('customer')
      table.string('billingType').defaultTo('BOLETO')
      table.string('dueDate')
      table.string('externalReference')

      table.string('invoiceUrl')
      table.string('paymentDate')
      table.string('paymentLink')


      table.timestamps()
    })
  }

  down() {
    this.drop('boletos_pagamentos')
  }
}

module.exports = BoletosPagamentoSchema
