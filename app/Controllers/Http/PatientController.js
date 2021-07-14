'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Patient = use('App/Models/Patient')
const Database = use('Database')

/**
 * Resourceful controller for interacting with patients
 */
class PatientController {
  /**
   * Show a list of all patients.
   * GET patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({request, response, view }) {
    const {id} = request.get()
    const patients = await Patient.query().where('clinic_id', id).fetch()

    return patients
  }

  /**
   * Render a form to be used for creating a new patient.
   * GET patients/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new patient.
   * POST patients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all()

    const patient = await Patient.create(data)

    return patient
  }

  /**
   * Display a single patient.
   * GET patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id}, request, response, view }) {
    const patient = await Patient.findOrFail(id)

    return patient
  }

  /**
   * Render a form to update an existing patient.
   * GET patients/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update patient details.
   * PUT or PATCH patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.all()

    const patient = await Patient.findOrFail(params.id)

    patient.merge(data)

    patient.save()

  }

  /**
   * Delete a patient with id.
   * DELETE patients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = PatientController
