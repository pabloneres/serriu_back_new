const MqttListener = use('MqttListener')

class MockListener extends MqttListener {
  /*
   * Subscription string. Uses the MQTT wildcard format.
   */
  async connected () {
    console.log('Mqtt Connected')
    return
  }

  /**
  * Message handler is passed the String data of the message and the matched wildcard values
  */
  async disconnected () {
    console.log('Mqtt Disconnected')
  }
}

module.exports = MockListener