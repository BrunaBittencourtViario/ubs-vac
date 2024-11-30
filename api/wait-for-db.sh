#!/bin/bash

# Espera o banco de dados (MySQL) estar disponível
echo "Esperando o MySQL iniciar..."

# Loop até conseguir conectar no banco de dados
until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1"; do
  >&2 echo "MySQL não está disponível - esperando..."
  sleep 2
done

echo "MySQL está disponível! Iniciando o backend..."

# Inicia o servidor Node.js
npm start
