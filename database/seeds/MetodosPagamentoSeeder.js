'use strict'

/*
|--------------------------------------------------------------------------
| MetodosPagamentoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const MetodosPagamento = use('App/Models/MetodosPagamento')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class MetodosPagamentoSeeder {
  async run() {
    const metodos = [
      {
        name: 'Dinheiro',
        value: 'dinheiro'
      },
      {
        name: 'Débito',
        value: 'debito'
      },
      {
        name: 'Crédito',
        value: 'credito'
      },
      {
        name: 'Pix',
        value: 'pix'
      },
    ]

    await MetodosPagamento.createMany(metodos)
  }
}

module.exports = MetodosPagamentoSeeder
