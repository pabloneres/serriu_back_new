'use strict'

const Boleto = use('App/Models/BoletosPagamento')

class AssaController {
  event({ request, response }) {
    const data = request.all()
    switch (data.event) {
      case 'PAYMENT_CREATED':

        await Boleto.create(data.payment)
        response.status(200).send({ message: 'Criado' })
        return

      default:
        response.status(200).send({ message: 'Recebido' })
    }
  }

}

module.exports = AssaController
