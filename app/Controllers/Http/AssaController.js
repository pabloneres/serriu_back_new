'use strict'

const Boleto = use('App/Models/BoletosPagamento')

class AssaController {
  async event({ request, response }) {
    const data = request.all()
    switch (data.event) {
      case 'PAYMENT_CREATED':

        await Boleto.create({
          ...data.payment,
          orcamento_id: data.payment.externalReference,
        })
        response.status(200).send({ message: 'Criado' })
        return

      default:
        response.status(200).send({ message: 'Recebido' })
    }
  }

}

module.exports = AssaController
