
const Event = use('Event');
const Mqtt = use('Mqtt');
   
// Listen to some Events of the library
Event.on('MQTT:Connected', 'Mqtt.connected')
Event.on('MQTT:Disconnected', 'Mqtt.disconnected')

Event.on('ESP:Command', 'EspCommand.method')
Event.on('ESP:Infos', 'EspInformacao.method')
Event.on('ESP:Log', 'EspLog.method')