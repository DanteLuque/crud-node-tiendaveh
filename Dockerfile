# Imagen base oficial de Node.js
FROM node:20

# Instala tzdata para configurar zona horaria
RUN apt-get update && apt-get install -y tzdata

# Configura la zona horaria a Lima
ENV TZ=America/Lima

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Exponer el puerto
EXPOSE 3000

# Iniciar la app
CMD ["node", "index.js"]