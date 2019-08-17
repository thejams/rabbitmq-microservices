const amqp = require('amqplib/callback_api');


class RabbitMQService {
    constructor(internalQueue) {
        this.internalQueue = internalQueue || 'internalQueue'
        this.connected = false
        this.connection = null
        this.channel = null
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                throw error0;
            }
            this.connection = connection
            this.createChannel()
        })
    }

    createChannel() {
        this.connection.createChannel((error1, channel) => {
            if (error1) {
                this.connected = false
                throw error1;
            }
            this.channel = channel
            this.subscribeToQueue()
        });
    }

    getConnectionStatus() {
        return this.connected
    }

    sendMessage(msg, queue) {
        console.log(`Ìn Micro Service #01 we are about to send the following message: ${msg}`);
        this.channel.sendToQueue(queue, Buffer.from(msg));        
    }

    subscribeToQueue() {
        this.channel.assertQueue(this.internalQueue, {
            durable: false
        });

        this.channel.consume(
            this.internalQueue, 
            (msg) => {
                console.log(`In Micro Service #01 we receive the following message: ${msg.content.toString()}`);
            }, 
            { noAck: true }
        );
    }
}

module.exports = RabbitMQService
