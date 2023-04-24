FROM node:12.18.1

WORKDIR /app

RUN mkdir -p /backend

COPY ["/package.json", "/package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 27017

CMD [ "node", "./backend/server.js" ]