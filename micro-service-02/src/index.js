// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
const RabbitService = require('./rabbit-service')
const rabbitService = new RabbitService('microService02')

app.get('/', async (req, res) =>  {
   if (rabbitService.isConnected()) {
      rabbitService.sendMessage('Greetings from the Micro Service #02', 'microService01')
      res.send('we already send a message to the micro service number 01')
   } else {
      await rabbitService.connectServer()
      if (rabbitService.isConnected()) {
         rabbitService.sendMessage('Greetings from the Micro Service #02 another try', 'microService01')
         res.send('we send a message to the micro service number 01 after a second reconnect to rabbitmq server')
      }
      else
         res.send('rabbit is not connected, please try again in a few moments')
   }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))
