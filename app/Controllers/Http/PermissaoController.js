'use strict'

const User = use('App/Models/User')
const Log = use('App/Models/Log')


class PermissaoController {
  async hasPermission({ request, response, auth }) {
    const data = request.all()

    console.log(auth.user)

    const user = await User.findBy('code', data.passwordCode)

    if (!user) {
      response.status(401).send({ message: 'Acesso negado' })
    }

    const returnAction = (action) => {
      switch (action) {
        case 'entrada':
          return 'Permissão de entrada mínima.'
        case 'desconto':
          return 'Desconto de procedimento.'
      }
    }

    const returnDescription = (action) => {
      switch (action) {
        case 'entrada':
          return `Entrada mínima autorizada de R$ ${data.entradaAntes} para R$ ${data.entradaDepois} (${data.paciente})`
        case 'desconto':
          return 'Desconto autorizado.'
      }
    }

    await Log.create({
      user_logado: auth.user.id,
      user_permissao: user.id,
      action: returnAction(data.action),
      description: returnDescription(data.action),
      orcamento_id: data.orcamento_id,
      procedimento_id: data.procedimento_id
    })

    response.status(200).send({ message: 'Acesso permitido' })
  }
}

module.exports = PermissaoController
