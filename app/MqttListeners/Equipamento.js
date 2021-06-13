'use strict'

const MqttListener = use('MqttListener');
const beforeEvent = use('App/Helpers/beforeEvent')

class Equipamento extends MqttListener {
  /**
  * This is the subscription string the listener is listening to.
  *
  * @returns {string}
  */
  get subscription () {
    return '';
  }

  /**
  * Message handler. Do what you want with your MQTT message here.
  *
  * @param {String} message Data of the message
  * @param {String[]} wildcardMatches Wildcard matches in your subscription string
  */
  async handleMessage (message, wildcardMatches) {
    try {
      console.log(message)
    } catch (error) {
      console.log('erro')
    }
  }
}

module.exports = Equipamento
