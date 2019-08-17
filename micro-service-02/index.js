// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000
const RabbitService = require('./rabbit-service')
const rabbitService = new RabbitService('microService02')

app.get('/', (req, res) =>  {      
   rabbitService.sendMessage('Greetings from the Micro Service #02', 'microService01')
   res.send('Hello Micro Service Number 02!')
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))
