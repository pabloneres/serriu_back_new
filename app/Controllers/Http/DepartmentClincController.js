'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with departmentclincs
 */

const DepartmentClinc = use('App/Models/DepartmentClinc')

class DepartmentClincController {
  /**
   * Show a list of all departmentclincs.
   * GET departmentclincs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { clinic_id } = request.get()

    const departments = await DepartmentClinc.query().where('clinic_id', clinic_id).fetch()

    return departments

  }

  /**
   * Render a form to be used for creating a new departmentclinc.
   * GET departmentclincs/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new departmentclinc.
   * POST departmentclincs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
    const data = request.all()
    // return data

    let result = await DepartmentClinc.query()
      .where('clinic_id', params.id)
      .andWhere('department_id', data.department_id)
      .first()

    if (!result) {
      await DepartmentClinc.create({
        department_id: data.department_id,
        clinic_id: params.id,
        discount: data.discount
      })
      return result
    }

    await DepartmentClinc.query()
      .where('id', result.id)
      .update({ discount: data.discount })

    return result

    // let result = await DepartmentClinc.findOrCreate({
    //   department_id: data.department_id,
    //   clinic_id: params.id
    // }, {
    //   department_id: data.department_id,
    //   clinic_id: params.id,
    //   discount: data.discount
    // })

    // result = result['$attributes']

    // console.log(result.discount)
    // console.log(data.discount)

    // if (data.discount === result.discount) {
    //   await DepartmentClinc.query()
    //   .where('id', result.id)
    //   .update({discount: data.discount})

    //   return result
    // }

    // return result
    // let obj = []

    // Object.keys(data).forEach(function(key) {

    //   obj.push({
    //     clinic_id: params.id,
    //     department_id: data[key].department_id,
    //     discount: data[key].desconto
    //   })

    // });

    // await DepartmentClinc.createMany(obj)
  }

  /**
   * Display a single departmentclinc.
   * GET departmentclincs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing departmentclinc.
   * GET departmentclincs/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update departmentclinc details.
   * PUT or PATCH departmentclincs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a departmentclinc with id.
   * DELETE departmentclincs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = DepartmentClincController
