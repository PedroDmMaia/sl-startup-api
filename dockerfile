# Etapa 1: Construção da aplicação
FROM node:20-alpine AS builder

# Configuração do diretório de trabalho
WORKDIR /app

# Instalar o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copiar arquivos necessários para instalação das dependências
COPY package.json pnpm-lock.yaml ./

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

# Variáveis específicas do Supabase (substitua pelos valores reais)
ENV DATABASE_URL=<SUA_DATABASE_URL>
ENV SUPABASE_SERVICE_ROLE_KEY=<SEU_SUPABASE_SERVICE_ROLE_KEY>
ENV JWT_PRIVATE_KEY='<SUA_CHAVE_PRIVADA_JWT>'
ENV JWT_PUBLIC_KEY='<SUA_CHAVE_PUBLICA_JWT>'

# Expor a porta da aplicação
EXPOSE 3000

# Comando para inicializar a aplicação
CMD ["node", "dist/index.js"]
