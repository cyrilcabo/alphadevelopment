FROM node:12.18-alpine3.12
COPY server/ /home/node/alphadevelopment/
WORKDIR /home/node/alphadevelopment/
RUN npm install
EXPOSE 4000
CMD node index.js
