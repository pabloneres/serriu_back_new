'use strict'

class AssaController {
  event({ request, response }) {
    const data = request.all()
    console.log(data)

    response.status(200).send({ message: 'Recebido' })
  }
}

module.exports = AssaController
