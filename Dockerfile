FROM node:22-alpine

WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install && npm cache clean --force
COPY . .
RUN npm run build
RUN ls -a

EXPOSE 8881

CMD ["node", "./dist/index.js"]