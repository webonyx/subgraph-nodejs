FROM node:16-bullseye

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY apps.js .
COPY apps.graphql .

CMD [ "node", "apps.js" ]
