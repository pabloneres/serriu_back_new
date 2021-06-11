'use strict'

const Mqtt = use('Mqtt');

class MqttController {
  async store({request, response}) {
    const { message, rota } = request.all()
    await Mqtt.sendMessage(rota, message, {qos: 1})
  }

}

module.exports = MqttController
