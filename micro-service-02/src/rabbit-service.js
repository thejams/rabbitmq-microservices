const amqp = require('amqplib/callback_api');


class RabbitMQService {
    constructor(internalQueue) {
        this.internalQueue = internalQueue || 'internalQueue'
        this.connected = false
        this.channel = null
        this.connection = null
        this.url = process.env.RABBIT_URL || 'localhost'
        this.connectServer()
    }

    async connectServer() {
        return new Promise(async (resolve, reject) => {
            amqp.connect(`amqp://${this.url}`, async (error, connection) => {
                if (error) 
                    console.log(error)
                else {
                    this.connection = connection
                    this.connected = true
                    await this.createChannel()
                }
                resolve()
            })
        })
    }

    createChannel() {
        return new Promise(async (resolve, reject) => {
            this.connection.createChannel(async (error, channel) => {
                if (error) {
                    console.log(error)
                    this.connected = false
                }
                this.channel = channel
                await this.subscribeToQueue()
                resolve()
            });
        })
    }

    isConnected() {
        return this.connected
    }

    sendMessage(msg, queue) {
        console.log(`Ìn Micro Service #02 we are about to send the following message: ${msg}`);
        this.channel.sendToQueue(queue, Buffer.from(msg));        
    }

    subscribeToQueue() {
        return new Promise(async (resolve, reject) => {
            this.channel.assertQueue(this.internalQueue, {
                durable: false
            });
    
            this.channel.consume(
                this.internalQueue, 
                (msg) => {
                    console.log(`In Micro Service #02 we receive the following message: ${msg.content.toString()}`);
                }, 
                { noAck: true }
            );
            resolve()
        })
    }
}

module.exports = RabbitMQService
