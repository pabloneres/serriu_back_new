'use strict'

const Department = use('App/Models/Department')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DepartmentSeeder {
  async run () {
    const departments = [
      {
        name: 'Dentista',
        description: 'dentista clinica'
      },
      {
        name: 'Recepcionista',
        description: 'recepcionista clinica'
      }
    ]

    await Department.createMany(departments)
  }
}

module.exports = DepartmentSeeder
