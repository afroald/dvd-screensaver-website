FROM node:11 as build
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn run build

FROM node:11
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock /app/
RUN yarn install
COPY --from=build /app/.nuxt /app/.nuxt
COPY . /app
CMD ["yarn", "run", "start"]
