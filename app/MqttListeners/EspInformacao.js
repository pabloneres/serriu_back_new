'use strict'

const MqttListener = use('MqttListener');
const Event = use('Event')

const Equipamento = use('App/Models/Equipamento');

class EspInformacao extends MqttListener {
  /**
  * This is the subscription string the listener is listening to.
  *
  * @returns {string}
  */
  get subscription () {
    return 'serriu/esp/informacoes';
  }

  /**
  * Message handler. Do what you want with your MQTT message here.
  *
  * @param {String} message Data of the message
  * @param {String[]} wildcardMatches Wildcard matches in your subscription string
  */
  async handleMessage (message, wildcardMatches) {
    try {
      Event.fire('Esp:Informacoes', message)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EspInformacao
