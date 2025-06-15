# Client Gateway

API Gateway para microservicios con NestJS y NATS.

## Cómo correr la aplicación

### 1. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

El archivo `.env` debe contener:

```env
PORT=3000
NATS_SERVERS="nats://localhost:4222,nats://localhost:4223"
```

### 2. Iniciar NATS server

```bash
docker run -d --name nats-server -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

### 3. Instalar dependencias

```bash
# Instalar yarn si no lo tienes
npm install -g yarn

# Instalar dependencias del proyecto
yarn install
```

### 4. Correr la aplicación

```bash
yarn start:dev
```

La aplicación estará disponible en: `http://localhost:3000/api`
