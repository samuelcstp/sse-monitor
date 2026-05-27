FROM node:20-alpine

WORKDIR /app

# Como não usamos dependências externas (npm), só copiamos os arquivos direto
COPY server.js index.html ./

EXPOSE 3000

CMD ["node", "server.js"]