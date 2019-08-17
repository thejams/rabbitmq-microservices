# rabbitmq-microservices
a simple micro services app with a rabbitmq implementation for comunnication bettween the micro services

- to run it, make a clone of this repo
- then in the root folder run docker-compose-build
- and then run docker-compose up -d
- this will run the micro services 01 and 02 in ports 4000 and 5000 respectively
- all you need to do is make a get request to localhost:4000 and localhost:5000 and the services will send messages to each others via rabbitmq
