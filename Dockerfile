# Etapa de compilación: genera los archivos estáticos de Vite.
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de ejecución: Nginx sirve únicamente el resultado compilado.
FROM nginx:1.27-alpine

# Render define PORT; 80 permite ejecutar la imagen localmente sin variables extra.
ENV PORT=80

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

