'use strict'
var mqtt = require('mqtt')
var fs = require('fs')


const URL = 'mqtts://staging.broker.nucleus.cantiz.com:8883';
// const URL = 'mqtt://192.168.11.42:1883'; 
const MQTT_USERNAME = 'vernemq_attinad';
const MQTT_PASSWORD = 'attinad@123';
const TOPIC = 'attinad-roomcast-smart-bulb-topic';
const CERTIFICATE_PATH = './att-ver-authority-certificate.pem';

var opts ={
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    ca: fs.readFileSync(CERTIFICATE_PATH),
    username: MQTT_USERNAME,
    password: MQTT_PASSWORD,
    rejectUnauthorized: false,
    protocol: 'mqtts',
    secureProtocol: 'TLSv1_2_method'
}

var client;

module.exports = {
    initMQTT :function(){
        console.log('Connection initiated');
        client = mqtt.connect(URL,opts);
        console.log('ULR defined');
        console.log(client);
    

        client.on('connect', (success) => {
            console.log('connect');
            if (!success) {
              console.log('Client not connected...');
            }
          });
        client.on('error', (err) => {
        console.log('error', err);
        }); 
    
        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            client.end()
          })

        
    },



    publishMessage:function(message){
        // var data = generateMessage(message);
        client.publish(TOPIC, message);
        console.log(TOPIC);
        console.log(message);
    }


}

function generateMessage(message){
    return message
}