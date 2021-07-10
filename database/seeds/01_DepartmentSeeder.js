'use strict'

const Department = use('App/Models/Department')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DepartmentSeeder {
  async run() {
    const departments = [
      {
        id: 'administrador',
        name: 'Administrador',
        description: 'Admin do sistema'
      },
      {
        id: 'dentista',
        name: 'Dentista',
        description: 'Dentista'
      },
      {
        id: 'recepcionista',
        name: 'Recepcionista',
        description: 'Recepcionista'
      },
      {
        id: 'asb',
        name: 'Asb',
        description: 'Auxiliar de saude bucal'
      }
    ]

    await Department.createMany(departments)
  }
}

module.exports = DepartmentSeeder
