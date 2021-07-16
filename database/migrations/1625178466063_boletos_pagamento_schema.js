'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoletosPagamentoSchema extends Schema {
  up() {
    this.create('boletos_pagamentos', (table) => {

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


      table.string('object')
      table.string('id').primary()
      table.string('dateCreated')
      table.string('customer')
      table.string('installment')
      table.string('paymentLink')
      table.float('value')
      table.float('netValue')
      table.float('originalValue')
      table.float('interestValue')
      table.string('description')
      table.string('billingType')
      table.string('status')
      table.string('dueDate')
      table.string('originalDueDate')
      table.string('paymentDate')
      table.string('clientPaymentDate')
      table.string('invoiceUrl')
      table.string('invoiceNumber')
      table.string('externalReference')
      table.boolean('deleted')
      table.boolean('anticipated')
      table.string('creditDate')
      table.string('estimatedCreditDate')
      table.string('bankSlipUrl')
      table.string('lastInvoiceViewedDate')
      table.string('lastBankSlipViewedDate')
      table.boolean('postalService')
      table.timestamps()
    })
  }

  down() {
    this.drop('boletos_pagamentos')
  }
}

module.exports = BoletosPagamentoSchema
