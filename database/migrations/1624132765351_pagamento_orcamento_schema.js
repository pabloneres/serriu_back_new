'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PagamentoOrcamentoSchema extends Schema {
  up() {
    this.create('pagamento_orcamentos', (table) => {
      table.increments()
      table.integer('orcamento_id')
        .references('id')
        .inTable('orcamentos')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('procedimento_id')
        .references('id')
        .inTable('procedimento_execucaos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('especialidade_id')
        .references('id')
        .inTable('tabela_especialidades')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      // dinheiro
      // boleto
      // debito
      // credito
      table.string('formaPagamento')
      // pendente
      //pago
      table.string('status')
      table.string('vencimento')
      table.float('valor', 8, 2)
      table.float('restante', 8, 2)
      table.float('restanteOrcamento', 8, 2)
      table.float('valorAplicado', 8, 2)
      table.timestamps()
    })
  }

  down() {
    this.drop('pagamento_orcamentos')
  }
}

module.exports = PagamentoOrcamentoSchema
