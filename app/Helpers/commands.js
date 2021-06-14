export default {
  //COMANDO PARA ALTERAR
  setrf({espid, sensor, controle, sensor_status, sensor_timeout}) {
    return { espid,'comando':'setrf', sensor, controle, sensor_status, sensor_timeout}
  },
  //COMANDO SET RELE
  setrele ({espid, valor}) {
    return { espid,'comando':'setrele', valor}
  },
  //COMANDO GET STATUS RELE
  getstatusrele({espid, valor}) {
    return {espid,'comando':'getstatusrele', valor}
  },
  //COMANDO ALTERA WIFI
  setwifi({espid, ssid, passwd}) {
    return {espid, 'comando':'setwifi', ssid, passwd}
  },
  //COMANDO SET MQTT
  setmqtt({espid, broker, porta, user, pass, t_send}) {
    return {espid,'comando':'setmqtt', broker, porta, user, pass, t_send}
  },
  //COMANDO ALTERA FIRMWARE DO ESP
  updatefirmware({espid, valor = '1', url = 'http://jrcassa.com.br/dvr/Rev1.ino.bin'}) {
    return {espid,'comando':'updatefirmware', valor, url}
  },
  //COMANDO RESET ESP
  espreset({espid, valor = '1'}) {
    return {espid,'comando':'espreset', valor}
  },
  //COMANDO RECONECT WIFI ESP
  espwifireconect({espid, valor = '1'}) {
    return {espid,'comando':'espwifireconect', valor}
  }
}