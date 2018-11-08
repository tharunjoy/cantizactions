//const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');
var MqttHandler = require('./MQTTHandler');

const POWER_ON_INTENT = 'PowerON';
const POWER_OFF_INTENT = 'PowerOFF';
const AMBIANCE_INTENT = 'changeAmbiance';
const BLIND_CONTROL_INTENT = 'BlindControl';
const BLIND_CONTROL_ENTITY = 'blindscontrol';
const MOOD_TYPE_ENTITY = 'moods';
const THING_TYPE_ENTITY = 'things';

const app = dialogflow();

MqttHandler.initMQTT(); 

app.intent(POWER_ON_INTENT, (conv) => {
    const things_type = conv.parameters[THING_TYPE_ENTITY].toLowerCase();
    if(things_type == "main" || things_type == "room"){
        conv.ask('Done and Dusted');
        MqttHandler.publishMessage('AMBIENT-6');
    }else if(things_type == "ambient" || things_type == "mood"){
        conv.ask('At your wished')
        MqttHandler.publishMessage('AMBIENT-3');
    }else{
        conv.ask('Booooom..!!')
        MqttHandler.publishMessage('AMBIENT-4');
    }
    
});

app.intent(POWER_OFF_INTENT, (conv) => {
    const things_type = conv.parameters[THING_TYPE_ENTITY].toLowerCase();
    if(things_type == "main" || things_type == "room"){
        conv.ask('Done and Dusted');
        MqttHandler.publishMessage('AMBIENT-5');

    }else if(things_type == "ambient" || things_type == "mood"){
        conv.ask('At your wished');
        MqttHandler.publishMessage('AMBIENT-2');
    }else{
        conv.ask('Booooom..!!!')
        MqttHandler.publishMessage('AMBIENT-1');
    }
});

app.intent(AMBIANCE_INTENT, (conv) => {
    const mood_type = conv.parameters[MOOD_TYPE_ENTITY].toLowerCase();
    if(mood_type == "sleep"){
        MqttHandler.publishMessage('AMBIENT-b');
        conv.ask('Good Night..get a good sleep!');
    }else if(mood_type == "happy" || mood_type == "great"){
        MqttHandler.publishMessage('AMBIENT-e');
        conv.ask('You are awsome');
    }else if(meditate){
        MqttHandler.publishMessage('AMBIENT-d');
        conv.ask('Concentrate');
    }else if(romantic){
        MqttHandler.publishMessage('AMBIENT-a');
        conv.ask('Should I play some music');
    }else if(mood_type == "party" || mood_type == "dj"){
        MqttHandler.publishMessage('AMBIENT-0');
        conv.ask('Give me a drink..cheers');
    }
});

app.intent(BLIND_CONTROL_INTENT, (conv) => {
    const blindcontrol_type = conv.parameters[BLIND_CONTROL_ENTITY].toLowerCase();
    if(blindcontrol_type == "open"){
        MqttHandler.publishMessage('BLINDS-9');
        conv.ask('So plesent outside');
    }else if(blindcontrol_type == "close"){
        MqttHandler.publishMessage('BLINDS-0');
        conv.ask('Am closing');
    }else if(blindcontrol_type == "half close"){
        MqttHandler.publishMessage('BLINDS-5');
        conv.ask('Done');
    }else if(blindcontrol_type == "half open"){
        MqttHandler.publishMessage('BLINDS-5');
        conv.ask('Done');
    }
});


//exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
