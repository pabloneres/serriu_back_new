'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Clinic extends Model {
  config () {
    return this.hasOne('App/Models/ClinicConfig')
  }
}

module.exports = Clinic
