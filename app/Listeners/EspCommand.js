'use strict'

const EspCommand = exports = module.exports = {}

EspCommand.method = async (data) => {
  try {
    const command = JSON.parse(data)
    console.log(command)
  } catch (error) {
    console.log(error)
  }
}
