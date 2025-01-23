# Etapa 1: Construção da aplicação
FROM node:20-alpine AS builder

# Configuração do diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários
COPY package.json pnpm-lock.yaml ./

# Instalar o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar todos os arquivos do projeto
COPY . .

# Gerar a build do Prisma e do TypeScript
RUN pnpm prisma generate && pnpm build

# Etapa 2: Imagem final
FROM node:20-alpine

# Configuração do diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários da etapa de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Configuração de variáveis de ambiente
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://postgres:docker@localhost:5432/sl-postgres?schema=public
ENV JWT_PRIVATE_KEY='SEU_PRIVATE_KEY'
ENV JWT_PUBLIC_KEY='SEU_PUBLIC_KEY'

# Expor a porta da aplicação
EXPOSE 3000

# Comando para inicializar a aplicação
CMD ["node", "dist/src/infra/main.js"]
