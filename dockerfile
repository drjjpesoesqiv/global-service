FROM node:latest
WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
EXPOSE 7777:7777
CMD ["node", "./index.js", "7777", "prod"]
