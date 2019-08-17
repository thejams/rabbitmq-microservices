# pull a node image from docker hub
FROM node:10-alpine

# set the working dir to /app
WORKDIR /server 

# copy package.json to the container
COPY package.json package.json

# install package.json modules in container
# install nodemon for changes on the fly
RUN npm install && \ 
    npm install -g nodemon 

# copy everything to container /app
COPY . . 

# expose port 4000 to mount it to another port in local machine 
EXPOSE 4000 

# start server inside container
CMD [ "nodemon", "src/index.js" ] 