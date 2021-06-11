'use strict'

/*
|--------------------------------------------------------------------------
| CargoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Cargo = use('App/Models/Cargo')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CargoSeeder {
  async run () {
    const cargos = [
      {
        name: 'Administrador',
        description: 'Adiminstrador do sistema',
        status: 'ativo'
      },
      {
        name: 'Gerente',
        description: 'Gerente do sistema',
        status: 'ativo'
      },
      {
        name: 'Supervisor',
        description: 'Supervisor do sistema',
        status: 'ativo'
      },
      {
        name: 'Dentsta',
        description: 'Dentsta do sistema',
        status: 'ativo'
      },
      {
        name: 'Recepcionista',
        description: 'Recepcionista do sistema',
        status: 'ativo'
      },
    ]

    await Cargo.createMany(cargos)
  }
}

module.exports = CargoSeeder
