'use strict'

const Equipamento = use('App/Models/Equipamento')

const EspInformacao = exports = module.exports = {}

EspInformacao.method = async (data) => {
  console.log('info')
  const command = JSON.parse(data)

  const hasEsp = await Equipamento.findBy('espid', command.espid)

  if (!hasEsp) {
    await Equipamento.create(command)

    return
  }

  return

}
