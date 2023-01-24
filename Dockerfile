FROM node:18.13
WORKDIR /app-node

ARG PORT_BUILD=${PORT}

ENV PORT=$PORT_BUILD

EXPOSE $PORT_BUILD

COPY . .
RUN npm install
CMD ["npm", "run", "dev"]

