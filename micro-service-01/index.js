// index.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000
const RabbitService = require('./rabbit-service')
const rabbitService = new RabbitService('microService01')

app.get('/', (req, res) =>  {      
   rabbitService.sendMessage('Greetings from the Micro Service #01', 'microService02')
   res.send('Hello Micro Service Number 01!')
})

app.listen(PORT, () => console.log(`I just connected on port ${PORT}!`))
