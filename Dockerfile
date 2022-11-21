FROM node:alpine

WORKDIR /src

COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./


# COPY
COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD npm run dev