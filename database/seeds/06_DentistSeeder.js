'use strict'

/*
|--------------------------------------------------------------------------
| DentistSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const UserAcessClinic = use('App/Models/UserAcessClinic')

class DentistSeeder {
  async run() {
    let users = await Factory
      .model('App/Models/User')
      .createMany(10, { department_id: 'dentista' })

    users.forEach(async (user) => {
      await UserAcessClinic.create({
        user_id: user.id,
        clinic_id: 1
      })
    })


  }
}

module.exports = DentistSeeder
