FROM node:10.15.3
EXPOSE ${PORT}
RUN mkdir -p /app
WORKDIR /app
COPY nodemon.json .
COPY package.json .
COPY swagger.json .
COPY tsconfig.json .
COPY ./src ./src/
RUN rm -rf node_modules && npm cache clean --force
RUN npm install --loglevel verbose
CMD ["npm", "start"]
