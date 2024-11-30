# Utilizando a imagem oficial do Node.js
FROM node:16 AS build
# Definir o diretório de trabalho no container
WORKDIR /app
# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./
# Instalar dependências
RUN npm install
# Copiar o código da aplicação
COPY . .
# Build da aplicação React
RUN npm run build
# Etapa 2: Servindo o React Build usando o Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
# Expor a porta 80
EXPOSE 80
# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]