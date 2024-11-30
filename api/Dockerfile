# Utilizando a imagem oficial do Node.js
FROM node:20

# Definir o ambiente para evitar interação no debconf
ENV DEBIAN_FRONTEND=noninteractive

# Atualizar pacotes e instalar os pacotes de locale
RUN apt-get update && apt-get install -y locales locales-all

# Gerar o locale necessário
RUN locale-gen en_US.UTF-8

# Configurar o locale diretamente com as variáveis de ambiente
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o código da aplicação
COPY . .

# Copiar o script de espera para o banco de dados
COPY wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Expor a porta 8800 (ou qualquer outra porta que seu servidor utilize)
EXPOSE 8800

# Comando para iniciar o servidor Node.js
CMD ["npm", "start"]
