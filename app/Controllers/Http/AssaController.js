'use strict'

const Boleto = use('App/Models/BoletosPagamento')

class AssaController {
  async event({ request, response }) {
    const data = request.all()
    switch (data.event) {
      case 'PAYMENT_CREATED':
        try {
          const boleto = await Boleto.create({
            ...data.payment,
            orcamento_id: Number(data.payment.externalReference),
          })
          response.status(200).send({ message: boleto })
          return
        } catch (error) {
          response.status(400).send({ message: error })
          return
        }
      // response.status(200).send({ message: boleto })
      default:
        response.status(200).send({ message: 'Recebido mas não houve uma ação!' })
    }
  }

}

module.exports = AssaController


const createBoleto = async (data) => {
  return Boleto.create({
    ...data.payment,
    orcamento_id: data.payment.externalReference,
  })
}