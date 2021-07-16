const Paciente = use('App/Models/Patient')
const api = use('App/Helpers/assasApi')

const Assas = {
  async returnClientByID(id) {
    let paciente = await Paciente.query().where('id', id).first()
    paciente = paciente.toJSON()

    return api.get(`/customers?cpfCnpj=${paciente.cpf}`)
  },

  async returnClientOrCreate(id) {
    let paciente = await Paciente.query().where('id', id).first()
    paciente = paciente.toJSON()

    const { data } = await api.get(`/customers?cpfCnpj=${paciente.cpf}`)

    if (data.length > 0) {
      return data[0]
    }

    return api.post(`/customers`, {
      name: `${paciente.firstName} ${paciente.lastName}`,
      email: paciente.email,
      mobilePhone: paciente.tel,
      cpfCnpj: paciente.cpf,
      address: paciente.address,
      province: paciente.city,
      externalReference: paciente.id
    })

  },

  async createClient(id) {
    let paciente = await Paciente.query().where('id', id).first()
    paciente = paciente.toJSON()

    return api.post(`/customers`, {
      name: `${paciente.firstName} ${paciente.lastName}`,
      email: paciente.email,
      mobilePhone: paciente.tel,
      cpfCnpj: paciente.cpf,
      address: paciente.address,
      province: paciente.city,
      externalReference: paciente.id
    })
  },

  async createPayment({
    clientID,
    billingType = 'BOLETO',
    parcelas,
    valorParcela,
    vencimento,
    description,
    referencia
  }) {
    return api.post(`/payments`, {
      customer: clientID,
      billingType,
      installmentCount: parcelas,
      installmentValue: valorParcela,
      dueDate: vencimento,
      description,
      referencia
    })
  },
}

module.exports = Assas