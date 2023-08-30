# Use uma imagem base com o ambiente Node.js instalado
FROM node:16.20.1

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package.json yarn.lock ./

# Instale as dependências do Node.js
RUN yarn install

# Copie todo o código fonte para o contêiner
COPY . .

# Defina a porta que a aplicação expõe
EXPOSE 3333

# Comando para iniciar o servidor ou a aplicação
CMD [ "yarn", "dev" ]