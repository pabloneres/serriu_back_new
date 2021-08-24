'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clinics
 */

const Clinic = use('App/Models/Clinic')
const ClinicConfig = use('App/Models/ClinicConfig')
class ClinicController {
  /**
   * Show a list of all clinics.
   * GET clinics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const clinics = await Clinic.query().with('config').fetch()

    return clinics
  }

  /**
   * Render a form to be used for creating a new clinic.
   * GET clinics/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new clinic.
   * POST clinics
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.all()

    const clinic = await Clinic.create(data)

    await ClinicConfig.create({ clinic_id: clinic.id })

  }

  /**
   * Display a single clinic.
   * GET clinics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const clinic = await Clinic.findOrFail(params.id)

    return clinic
  }

  /**
   * Render a form to update an existing clinic.
   * GET clinics/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update clinic details.
   * PUT or PATCH clinics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    const data = request.all()

    const clinic = await Clinic.findOrFail(id)

    clinic.merge(data)

    clinic.save()
  }

  /**
   * Delete a clinic with id.
   * DELETE clinics/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const clinic = await Clinic.findOrFail(id)

    await clinic.delete()
  }
}

module.exports = ClinicController
