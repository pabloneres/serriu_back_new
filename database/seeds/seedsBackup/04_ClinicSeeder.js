'use strict'

/*
|--------------------------------------------------------------------------
| ClinicSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const ClinicConfig = use('App/Models/ClinicConfig')

class ClinicSeeder {
  async run() {
    const clinics = await Factory
      .model('App/Models/Clinic')
      .createMany(5)

    clinics.forEach(async (clinic) => {
      await ClinicConfig.create({
        clinic_id: clinic.id
      })
    })
  }
}

module.exports = ClinicSeeder
