'use strict'

const Event = use('Event')

const commands = ('App/Helpers/command')

class EspCommandController {
  async command({request, response, auth}) {

    const data = request.all()

    const func = commands[data.command]

    
    
    


    Event.fire()
  }
}

module.exports = EspCommandController
