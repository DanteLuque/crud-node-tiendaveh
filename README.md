
# 🚗 CRUD de Vehículos – Node.js + Express + MySQL

Aplicación simple para gestionar vehículos, construida con **Node.js 20+**, **Express 5**, **MySQL** y expuesta públicamente con **Ngrok** a través de **Docker** 🐳.

## 🔄 Características

-   CRUD completo de vehículos (crear, listar, actualizar y eliminar con soft delete).
-   Validaciones con **Joi** para entradas de datos.
-   Prevención de duplicados por número de placa.
-   Conexión a base de datos MySQL mediante **mysql2/promise**.
-   Exposición de la API en un **dominio público** usando Ngrok.
-   Proyecto **dockerizado** con `docker-compose`.

## 📅 Requisitos previos

-   🟢 Node.js **20 o superior**
-   🐬 MySQL **8+**
-   🐳 Docker y Docker Compose instalados
-   🌍 Cuenta en [Ngrok](https://ngrok.com/?utm_source=chatgpt.com) (para exponer tu API)

## 📚 Instalación

1.  **Clona el repositorio**:
```bash
git clone https://github.com/DanteLuque/crud-node-tiendaveh.git
```
2. Instala dependencias:
```bash
npm install
```
3. Copiar el archivo .env.example y pegar el contenido en un archivo nuevo llamado `.env` en la ruta raíz.

4. Edita en `.env` los valores de conexión:
```bash
# SERVER
PORT=3000
# DATABASE MYSQL
HOST=localhost
USER=root
PASSWORD=
DB=tiendaveh
# NGROK
NGROK_AUTHTOKEN=tu_token_aqui
NGROK_DOMAIN=tu_dominio_estatico_aqui
```

5.  **Crea la base de datos** ejecutando el script:
-   ejecuta el script:
```bash
src/config/mysql/Database/base.sql
```

## 🚀 Ejecución
### Opción 1 – Local (modo desarrollo)

Ejecutar en otro puerto con **nodemon**:
```bash
npm run dev
```
👉 La API quedará disponible en:
```bash
http://localhost:3001/api/v1/vehiculos
```
### Opción 2 – Docker + Ngrok
Para obtener el authtoken y el dominio de ngrok, puede seguir estos pasos: [Guía de Ngrok](docs/ngrok.md)
Luego construir y levantar con Docker Compose:
```docker
docker-compose up --build -d
```
👉 La API quedará disponible públicamente en tu dominio configurado en `.env`:
```docker
https://tu-dominio.ngrok-free.app/api/v1/vehiculos
```


## 🧭 Endpoints principales
| Método | Ruta                           | Descripción                       |
|--------|--------------------------------|-----------------------------------|
| GET    | `/api/v1/vehiculos`            | Listar vehículos                |
| GET    | `/api/v1/vehiculos/:id`          | Obtener vehículo por ID          |          |
| POST   | `/api/v1/vehiculos`           | Crear un vehículo            |
| PATCH| `/api/v1/vehiculos/:id`    | Actualizar un vehículo             |
| GET    | `/api/v1/vehiculos/:id`  | Eliminar (soft delete) |

## 📁 Estructura del proyecto
danteluque-crud-productos-codeigniter/  
``` 
wstiendaveh/
├── .env.example                   # Plantilla de variables de entorno
├── docker-compose.yml             # Configuración de servicios app + ngrok
├── Dockerfile                     # Imagen base de Node.js
├── index.js                       # Punto de entrada
├── src/
│   ├── server.js                  # Configuración de servidor Express
│   ├── config/
│   │   └── mysql/                 # Configuración de MySQL + script base
│   ├── modules/
│   │   ├── shared/                # Clases base (controller/model)
│   │   └── vehiculos/             # Módulo CRUD de vehículos
│   │       ├── controller/        # Lógica de controladores
│   │       ├── models/            # Modelo Vehiculo
│   │       ├── routes/            # Definición de rutas
│   │       └── validators/        # Validaciones con Joi
│   └── request/                   # Colecciones REST (local y prod)
└── docs/ngrok.md                  # Documentación extra sobre Ngrok

```

## 📝 Contribución

Si deseas contribuir a este proyecto:
1.  Haz un fork
2.  Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3.  Realiza tus cambios
4.  Haz commit (`git commit -m "Nueva funcionalidad"`)
5.  Sube la rama (`git push origin feature/nueva-funcionalidad`)
6.  Abre un Pull Request 🚀