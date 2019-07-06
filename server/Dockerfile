FROM node:8.11.4-alpine

WORKDIR /server

RUN npm i -g nodemon

COPY package*.json /server/
RUN npm install

COPY . /server/

EXPOSE 4000

CMD ["npm", "start"]
