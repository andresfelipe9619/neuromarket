FROM node:8.11.4-alpine

WORKDIR /client

COPY package*.json /client/
RUN npm install

COPY . /client/

EXPOSE 3000
EXPOSE 35729

CMD ["npm", "start"]
