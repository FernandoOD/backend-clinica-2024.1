# Etapa de compilación
FROM node:20-slim AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala dependencias (sin devDependencies)
RUN npm install

# Copia el resto del proyecto
COPY . .

# Si tu proyecto necesita compilación de TypeScript, descomenta esta línea:
RUN npm run build

# Etapa final: imagen ligera para producción
FROM node:20-slim

WORKDIR /app

# Copia solo lo necesario desde la etapa de build
COPY --from=build /app .

# Expón el puerto que usará tu app
ENV PORT=8080
EXPOSE 8080

# Comando de inicio
CMD ["npm", "start"]
