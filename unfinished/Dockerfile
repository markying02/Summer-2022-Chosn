# Dockerfile for React client

# Build react client
FROM node:12.18.1

# Working directory be app
WORKDIR /usr/src/app

COPY /package*.json ./

###  Installing dependencies

RUN npm install --production

# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]