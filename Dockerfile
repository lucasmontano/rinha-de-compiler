FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD [ "node", "execute.js" ]
