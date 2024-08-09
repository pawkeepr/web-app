# PawKeeper Web-App


Este é um projeto de aplicação web configurado que pode ser executado em um contêiner Docker. Ele utiliza diversas ferramentas e configurações para desenvolvimento, teste e deploy.

## Estrutura do Projeto

- `.github/`: Configurações específicas do GitHub.
- `.storybook/`: Configurações e histórias para o Storybook.
- `@types/`: Definições de tipos TypeScript.
- `deps/`: Dependências do projeto.
- `guias/`: Guias e documentação.
- `pages/`: Páginas da aplicação.
- `public/`: Arquivos públicos estáticos.
- `source/`: Código-fonte principal.
- `styles/`: Arquivos de estilo.
- `.editorconfig`: Configurações de editor.
- `.env.example`: Exemplo de arquivo de configuração de ambiente.
- `.gitignore`: Arquivos e pastas ignorados pelo Git.
- `biome.json`: Configuração específica para o Biome.
- `chromatic.config.json`: Configuração para Chromatic.
- `cypress.config.ts`: Configuração para Cypress (testes end-to-end).
- `docker-compose.yml`: Configuração do Docker Compose.
- `Dockerfile`: Configuração do Docker.
- `next-env.d.ts`: Definições de ambiente para Next.js.
- `next-i18next.config.js`: Configuração para internacionalização com Next.js.
- `next.config.js`: Configuração principal do Next.js.
- `package.json`: Dependências e scripts do projeto.
- `postcss.config.js`: Configuração do PostCSS.
- `README.md`: Documentação do projeto.
- `serverless.yml`: Configuração para deploy serverless.
- `setupMocks.ts`: Configurações de mocks para testes.
- `setupTests.ts`: Configurações para testes.
- `tailwind.config.js`: Configuração do Tailwind CSS.
- `tsconfig.json`: Configuração do TypeScript.
- `turbo.json`: Configuração do Turborepo.
- `vite.config.ts`: Configuração do Vite.
- `yarn.lock`: Arquivo de bloqueio de dependências do Yarn.

## Pré-requisitos

- Docker e Docker Compose instalados na sua máquina.
- Yarn instalado globalmente (opcional, mas recomendado).

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. Instale as dependências do projeto:

```bash
yarn install
```

3. Construa a imagem Docker:

```bash
docker-compose build
```

4. Rode o contêiner:

```bash
docker-compose up
```

Agora sua aplicação estará rodando no endereço `http://localhost:3333`.

## Scripts Disponíveis (Execução Local)

No arquivo `package.json`, você pode encontrar os seguintes scripts:

- `test`: Executa testes unitários com o Vitest.
  
  ```bash
  yarn test
  ```

- `coverage`: Gera o relatório de cobertura de testes.
  
  ```bash
  yarn coverage
  ```

- `dev`: Inicia o servidor de desenvolvimento do Next.js na porta 3001.
  
  ```bash
  yarn dev
  ```

- `prebuild`: Gera o arquivo CSS minificado com o Tailwind CSS.
  
  ```bash
  yarn prebuild
  ```

- `build`: Constrói a aplicação Next.js para produção.
  
  ```bash
  yarn build
  ```

- `start`: Inicia o servidor Next.js na porta 3001.
  
  ```bash
  yarn start
  ```

- `lint`: Executa a verificação de código com o Biome.
  
  ```bash
  yarn lint
  ```

- `format`: Formata o código com o Biome.
  
  ```bash
  yarn format
  ```

- `storybook`: Inicia o Storybook na porta 6006.
  
  ```bash
  yarn storybook
  ```

- `build-storybook`: Constrói a versão estática do Storybook.
  
  ```bash
  yarn build-storybook
  ```

## Comandos Úteis

- Para acessar o contêiner em execução:

```bash
docker exec -it <container_id> /bin/sh
```

- Para parar e remover os contêineres:

```bash
docker-compose down
```

## Contribuindo

Pull requests são bem-vindos. Para mudanças maiores, por favor abra um problema primeiro para discutir o que você gostaria de mudar.

Por favor, certifique-se de atualizar os testes conforme apropriado.

## Licença

[MIT](LICENSE)
```

Certifique-se de substituir os espaços reservados (`seu-usuario`, `seu-repositorio`, etc.) com as informações apropriadas do seu projeto.