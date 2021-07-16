'use strict'

class AssaController {
  event({ request, response }) {
    const data = request.all()
    console.log(data)
  }
}

module.exports = AssaController
