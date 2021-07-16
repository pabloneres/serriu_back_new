'use strict'

const Assas = use('App/Helpers/assas')

class TesteController {
  async index({ params }) {
    const client = await Assas.returnClientByID(params.id)
    return client
  }
  async createClient() {
    const client = await Assas.createClient({
      "name": "Pablo Neres",
      "email": "pabloneres@hotmail.com",
      "mobilePhone": "11958528808",
      "cpfCnpj": "49777558552",
      "postalCode": "01310-000",
      "address": "Av. Paulista2",
      "addressNumber": "150",
      "complement": "Sala 201",
      "province": "Centro",
      "externalReference": "1",
      "notificationDisabled": false,
      // "municipalInscription": "46683695908",
      // "stateInscription": "646681195275",
      "observations": "ótimo pagador, nenhum problema até o momento"
    })
    return client
  }
  async createBoleto({ request }) {
    const data = request.all()

    Assas.createPayment({
      clientID: data.clientID,
      parcelas: data.parcelas,
      valorParcela: data.valorParcela,
      vencimento: data.vencimento,
      description: 'teste descriiption',
      referencia: 'orcamento nª123',
    }).then((data) => {
      console.log(data)
    }).catch((error) => console.log(error.response.data))
  }
}

module.exports = TesteController
