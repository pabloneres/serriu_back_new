'use strict'

/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')
class AdminSeeder {
  async run() {
    const user = await User.create({
      username: 'admin',
      email: 'desenvolvimento@serriu.com.br',
      department_id: 'administrador',
      code: '0000',
      firstName: 'Admin',
      lastName: '',
      password: 'serriu123',
    })
  }
}

module.exports = AdminSeeder
