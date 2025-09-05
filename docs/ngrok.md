# 🚀 Guía para exponer tu app con **Docker** y **Ngrok**

## 📌 ¿Qué es Ngrok?

Ngrok es una herramienta que te permite exponer aplicaciones locales a Internet de manera segura 🌍.  
Con ella puedes obtener un **dominio público** y acceder a tu aplicación desde cualquier parte del mundo.

## 📝 Pasos para configurar Ngrok con Docker

### 1️⃣ Crear una cuenta en Ngrok

-   Ve a 👉 https://dashboard.ngrok.com/signup
-   Regístrate con tu correo o con GitHub/Google.

### 2️⃣ Obtener tu **AuthToken**

-   Una vez dentro del dashboard, dirígete a **Setup & Installation → Your Authtoken**.
-   Allí verás un comando como este:
```bash
ngrok config add-authtoken 2yupsKhG4EIrbZmVlWUWQUbWXDT_44iXf...
```
>Copia **solo el token** (`2yupsKhG4EIrb...`) y pégalo en tu archivo `.env` con la variable: **NGROK_AUTHTOKEN**
```bash
NGROK_AUTHTOKEN=2yupsKhG4EIrbZmVlWUWQUbWXDT_44iXf...
```
✅ Con esto, Ngrok sabrá que estás autenticado.

### 3️⃣ Obtener tu **Static Domain**

-   En el dashboard, ve a **Deploy Your App Online → Static Domain**.
-   Allí podrás reservar un dominio estático.
-   Ejemplo de comando:
 ```bash
 ngrok http --url=walrus-delicate-routinely.ngrok-free.app 80
```
>Copia el dominio `walrus-delicate-routinely.ngrok-free.app` y agrégalo a tu `.env`:
```bash
NGROK_DOMAIN=walrus-delicate-routinely.ngrok-free.app
```
### 4️⃣ Configurar variables de entorno

Tu archivo `.env` debería verse así:
```bash
# SERVER
PORT=3000
# DATABASE MYSQL
HOST=localhost
USER=root
PASSWORD=
DB=tiendaveh
# Api Gateway NGROK - exponer mi api
NGROK_AUTHTOKEN=2yupsKhG4EIrbZmVlWUWQUbWXDT_44iXf....
NGROK_DOMAIN=walrus-delicate-routinely.ngrok-free.app
```
### 5️⃣  Levantar con Docker Compose 🚀

Ejecutaremos el siguiente comando:
```docker
docker-compose up --build -d
```
Esto ejecutará el **docker-compose.yml**, en este caso la app podrá ser expuesta a internet pero seguirá ligada a una base de datos local, accediendo con el host **host.docker.internal** el cual es un nombre de DNS especial en Docker que permite a los contenedores referirse al **localhost**

### 6️⃣ Comprobar la url publica

Una vez levantado el contenedor en docker, podemos utilizar este comando:
```bash
curl http://localhost:4040/api/tunnels
```

El cual no mostrará la url que esta utilizando el tunel brindado por ngrok, podrán encontrarlo en **public_url**:
```json
Content           : {"tunnels":[{"name":"command_line","ID":"f122f8921fe3c534a92e25f64343743b","uri":"/api/tunnels/command_line","public_url":"https://walrus-delicate-routinely.ngrok-free.app","proto" 
                    :"https","config":{"...
```

### ✅ Detalles
Este contendor correrá en el puerto 3000 que está definido en el **.env**, pero en caso de querer testear los endpoints desde el entorno local, es decir `http://localhost:3001` pueden ejecutar el proyecto con el comando `dev`:
```js
"scripts": {
    "start": "node .",
    "dev": "cross-env PORT=3001 nodemon ."
  },
```
**cross-env** es un CLI que permite utilizar variables de entorno en distintos sistemas operativos, para este caso, lo usamos para ejecutar el mismo proyecto pero en un puerto diferente.

### 📝Nota:
En caso de querer usar ngrok, asegurarse de que su authtoken y su dominio no esté siendo utilizado por algun otro servicio activo, por ejemplo, otro contenedor en docker, ya que ngrok solo permite el uso de este servicio individualmente