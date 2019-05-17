FROM node:12 as build
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock /app/
RUN yarn install --production false
COPY . /app
RUN yarn run build

FROM node:12
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock /app/
RUN yarn install --production true
COPY --from=build /app/.nuxt /app/.nuxt
COPY . /app
CMD ["yarn", "run", "start"]
