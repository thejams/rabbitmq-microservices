// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const RabbitService = require('./rabbit-service')
const rabbitService = new RabbitService('microService01')

app.get('/', async (req, res) =>  {
   if (rabbitService.isConnected()) {
      console.log('rabbit is connected')
      rabbitService.sendMessage('Greetings from the Micro Service #01', 'microService02')
      res.send('we already send a message to the micro service number 02')
   } else {
      await rabbitService.connectServer()
      if (rabbitService.isConnected()) {
         rabbitService.sendMessage('Greetings from the Micro Service #01 another try', 'microService02')
         res.send('we already send a message to the micro service number 02')
      } 
      else
         res.send('rabbit is not connected, please try again in a few moments')
   }
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))
