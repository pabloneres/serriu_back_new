'use strict'

const Boleto = use('App/Models/BoletosPagamento')
const Orcamento = use('App/Models/Orcamento')

class AssaController {
  async event({ request, response }) {
    const data = request.all()

    const orcamento = await Orcamento.query().where('parcelamento_id', data.payment.installment).first()

    if (!orcamento) {
      response.status(400).send({ message: 'Orcamento não encontrado' })
      return
    }

    switch (data.event) {
      case 'PAYMENT_CREATED':
        try {
          const boleto = await Boleto.create({
            ...data.payment,
            orcamento_id: orcamento.id,
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