const MqttListener = use('MqttListener')

class MockListener extends MqttListener {
  /*
   * Subscription string. Uses the MQTT wildcard format.
   */
  get subscription () {
    return '/teste'
  }

  /**
  * Message handler is passed the String data of the message and the matched wildcard values
  */
  async handleMessage (message, wildcardMatches) {
    console.log(message)
  }
}

module.exports = MockListener