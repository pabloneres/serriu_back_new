'use strict'

const Equipamento = use('App/Models/Equipamento')

const EspInformacao = exports = module.exports = {}

EspInformacao.method = async (data) => {
  const command = JSON.parse(data)

  const hasEsp = await Equipamento.findBy('espid', command.espid)

  if (!hasEsp) {
    await Equipamento.create(command)

    return
  }

  const esp = await Equipamento.findOrFail(hasEsp.id)

  esp.merge(command)

  await esp.save


  return

}
