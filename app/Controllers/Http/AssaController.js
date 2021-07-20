'use strict'

const Boleto = use('App/Models/BoletosPagamento')
const Orcamento = use('App/Models/Orcamento')
const Assas = use('App/Helpers/assas')

class AssaController {
  async event({ request, response }) {
    const data = request.all()

    switch (data.event) {
      case 'PAYMENT_RECEIVED':
        let boleto = await Boleto.query().where('id', data.payment.id).first()

        if (!boleto) {
          response.status(200).send({ message: 'Boleto não encontrado' })
          return
        }

        await boleto.update({ ...data.payment })

        response.status(200).send({ message: `Pagamento confirmado em dinheiro, ID: ${boleto.id}` })

        return
      case 'PAYMENT_CREATED':
        try {
          const orcamento = await Orcamento.query().where('parcelamento_id', data.payment.installment).first()

          if (!orcamento) {
            response.status(401).send({ message: 'Orcamento não encontrado' })
            return
          }

          const boleto = await Boleto.create({
            ...data.payment,
            orcamento_id: orcamento.id,
          })
          response.status(200).send({ message: boleto })
          return
        } catch (error) {
          response.status(401).send({ message: error })
          return
        }
      // response.status(200).send({ message: boleto })
      default:
        response.status(200).send({ message: 'Recebido mas não houve uma ação!' })
        return
    }
  }

  async paymentCash({ request, response, params }) {
    const id = params.id

    let boleto = await Boleto.query().where('id', id).first()
    boleto = boleto.toJSON()

    await Assas.paymentCash(id, boleto.value)
  }

  async clean({ request, response }) {
    response.status(200).send({ message: 'Fila foi zerada' })
    return
  }

}

module.exports = AssaController