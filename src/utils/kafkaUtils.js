
const Kafka = require('node-rdkafka');
const { configFromEnv } = require('./kafkaConfig');

const ERR_TOPIC_ALREADY_EXISTS = 36;
const descriptions = {};

function ensureTopicExists(config) {
    const adminClient = Kafka.AdminClient.create({
      'bootstrap.servers': config['bootstrap.servers'],
      'sasl.username': config['sasl.username'],
      'sasl.password': config['sasl.password'],
      'security.protocol': config['security.protocol'],
      'sasl.mechanisms': config['sasl.mechanisms']
    });
  
    return new Promise((resolve, reject) => {
      adminClient.createTopic({
        topic: config.topic,
        num_partitions: 1,
        replication_factor: 3
      }, (err) => {
        if (!err) {
          console.log(`Created topic ${config.topic}`);
          return resolve();
        }
  
        if (err.code === ERR_TOPIC_ALREADY_EXISTS) {
          return resolve();
        }
  
        return reject(err);
      });
    });
  }
  
  function createProducer(config, onDeliveryReport) {
    const producer = new Kafka.Producer({
      'bootstrap.servers': config['bootstrap.servers'],
      'sasl.username': config['sasl.username'],
      'sasl.password': config['sasl.password'],
      'security.protocol': config['security.protocol'],
      'sasl.mechanisms': config['sasl.mechanisms'],
      'dr_msg_cb': true
    });
  
    return new Promise((resolve, reject) => {
      producer
        .on('ready', () => resolve(producer))
        .on('delivery-report', onDeliveryReport)
        .on('event.error', (err) => {
          console.warn('event.error', err);
          reject(err);
        });
      producer.connect();
    });
  }
  async function sendMessageToTopic(topic, initializer, message) {
    console.log("sending message to topic")
    const config = await configFromEnv(topic);
  
    if (config.usage) {
      return console.log(config.usage);
    }
  
    await ensureTopicExists(config);
  
    const producer = await createProducer(config, (err, report) => {
      if (err) {
        console.warn('Error producing', err)
      } else {
        const {topic, partition, value} = report;
        console.log(`Successfully produced record to topic "${topic}" partition ${partition} ${value}`);
      }
    });
  
    producer.produce(topic, -1, Buffer.from(message), initializer);
  
    producer.flush(10000, () => {
      producer.disconnect();
    });
  }
  function createConsumer(config, onData) {
    const consumer = new Kafka.KafkaConsumer({
      'bootstrap.servers': config['bootstrap.servers'],
      'sasl.username': config['sasl.username'],
      'sasl.password': config['sasl.password'],
      'security.protocol': config['security.protocol'],
      'sasl.mechanisms': config['sasl.mechanisms'],
      'group.id': `blank-humanity-games-bot-${new Date().getMinutes()}`
    }, {
      'auto.offset.reset': 'beginning',
      'auto.commit.enable': false
    });
  
    return new Promise((resolve, reject) => {
      consumer
        .on('ready', () => resolve(consumer))
        .on('data', onData);
  
      consumer.connect();
    });
  }
  async function startConsumer(topic) {
        const config = await configFromEnv(topic);

        if (config.usage) {
            return console.log(config.usage);
        }

        console.log(`Consuming records from ${config.topic}`);

        let seen = 0;
        let description = "";
        const consumer = await createConsumer(config, ({key, value, partition, offset}) => {
            console.log(`Consumed record with key ${key} and value ${value} of partition ${partition} @ offset ${offset}. Updated total count to ${++seen}`);
            if(Object.keys(descriptions).indexOf(key) > -1) {
                descriptions[key] = [...Object.values(descriptions[key]),value];            
            }
            else {
                descriptions[key] = [value]
            }
        });
        consumer.subscribe([config.topic]);
        consumer.consume();
        process.on('SIGINT', () => {
            console.log('\nDisconnecting consumer ...');
            consumer.disconnect();
            return 1;
        });        
  }
  
function PromiseTimeout(delayms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delayms);
    });
}
  async function getLatestInterpretation(initializer) {
      await PromiseTimeout(1000);
      return descriptions[initializer];
  }
module.exports = {
    sendMessageToTopic: sendMessageToTopic,
    startConsumer: startConsumer,
    getLatestInterpretation: getLatestInterpretation    
}