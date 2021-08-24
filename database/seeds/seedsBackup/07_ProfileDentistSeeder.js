'use strict'

/*
|--------------------------------------------------------------------------
| ProfileDentistSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const User = use('App/Models/User')

class ProfileDentistSeeder {
  async run() {
    let dentists = await User.query().where('department_id', 'dentista').fetch()
    dentists = dentists.toJSON()


    dentists.forEach(async (user) => {
      await Factory
        .model('App/Models/Profile')
        .create({ user_id: user.id })
    })

  }
}

module.exports = ProfileDentistSeeder
