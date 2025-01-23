# Etapa 1: Construção da aplicação
FROM node:20-alpine AS builder

# Configuração do diretório de trabalho
WORKDIR /app

# Instalar o OpenSSL e ferramentas básicas
RUN apk add --no-cache openssl

# Copiar arquivos necessários para instalação das dependências
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm globalmente e dependências
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar todos os arquivos do projeto
COPY . .

# Gerar a build do Prisma e do TypeScript
RUN pnpm prisma generate && pnpm build

# Etapa 2: Imagem final
FROM node:20-alpine

# Configuração do diretório de trabalho
WORKDIR /app

# Instalar o OpenSSL
RUN apk add --no-cache openssl

# Copiar apenas os arquivos necessários da etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Configuração de variáveis de ambiente
# Evite expor sensíveis diretamente aqui, como o DATABASE_URL, JWT_PRIVATE_KEY e JWT_PUBLIC_KEY
# Abaixo, você pode usar variáveis para conectar com um arquivo .env
# A leitura de variáveis de ambiente pode ser feita em tempo de execução, por exemplo, usando Docker Compose ou com `docker run`

# Exemplo de variáveis para o Prisma em produção
ENV NODE_ENV=production
ENV PRISMA_CLI_QUERY_ENGINE_TYPE=openssl

# Expor a porta da aplicação
EXPOSE 3000

# Comando para inicializar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/infra/main.js"]
