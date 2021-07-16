'use strict'

const Boleto = use('App/Models/BoletosPagamento')

class AssaController {
  event({ request, response }) {
    const data = request.all()
    switch (data.event) {
      case 'PAYMENT_CREATED':

        Boleto.create({
          ...data.payment,
          orcamento_id: data.payment.externalReference,
        }).then(() => {
          response.status(200).send({ message: 'Criado' })
        }).catch((error) => {
          response.status(400).send({ message: error })
        })
        return

      default:
        response.status(200).send({ message: 'Recebido' })
    }
  }

}

module.exports = AssaController
