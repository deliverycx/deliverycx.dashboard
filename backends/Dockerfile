FROM node:20.12.2 AS development

WORKDIR /usr/node/app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .


RUN npm run build

FROM node:20.12.2 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/node/app


COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

COPY --from=development /usr/node/app/dist ./dist

CMD ["node", "dist/main"]