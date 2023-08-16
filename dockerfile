# Build stage
FROM node:18.15.0 As builder

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN npm ci \
 && npm run build

# Final stage
FROM node:18.15.0

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --from=builder /home/node/app/node_modules/ ./node_modules
COPY --from=builder /home/node/app/dist/ ./


ENV HOST=0.0.0.0 PORT=3000
EXPOSE ${PORT}
CMD ["node", "main"]


