'use strict'

const Role = use('App/Models/Role')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RoleSeeder {
  async run () {
    const roles = [
      {
        id: 'orcamento',
        name: 'Orçamento'
      },
      {
        id: 'agenda',
        name: 'Agenda'
      },
      {
        id: 'clinics',
        name: 'Clinicas'
      },
      {
        id: 'patients',
        name: 'Pacientes'
      },
    ]

    await Role.createMany(roles)
  }
}

module.exports = RoleSeeder
