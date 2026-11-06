FROM node:24
WORKDIR /app/event-router

COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable && yarn install --immutable

COPY . .

RUN yarn run build
EXPOSE 4001
CMD ["yarn", "run", "dev"]
