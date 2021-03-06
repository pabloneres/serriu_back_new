'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProcedimentoExecucaoSchema extends Schema {
  up() {
    this.create('procedimento_execucaos', (table) => {
      table.increments()
      table
        .integer('orcamento_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orcamentos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('especialidade_id')
        .unsigned()
        .references('id')
        .inTable('tabela_especialidades')
        .onUpdate('CASCADE')
      // .notNullable()
      // .onDelete('CASCADE')

      table
        .integer('procedimento_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('tabela_procedimentos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('negociacao_id')
        .unsigned()
        .references('id')
        .inTable('negociacaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.json('faces').defaultTo(null)

      table.string('detalhes', 5000)

      table.string('status_execucao').defaultTo('aprovado') //salvo //aprovado //pendente //executado
      table.string('status_pagamento')

      table.string('data_execucao', 255)

      table.string('dente', 255)

      table.string('desconto', 255)

      table.float('valor', 8, 2)

      table
        .integer('dentista_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('titular')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('procedimento_execucaos')
  }
}

module.exports = ProcedimentoExecucaoSchema
