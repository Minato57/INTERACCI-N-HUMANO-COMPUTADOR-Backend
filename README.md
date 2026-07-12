# 🔧 DIFERPA S.A.C. — Backend API

[![Repositorio Frontend](https://img.shields.io/badge/Ver_Frontend-%E2%86%92-DD0031?style=flat-square&logo=angular)](https://github.com/Minato57/Interaccion-Humano-Computador-Frontend)

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF0000?style=for-the-badge&logo=typeorm&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

API REST del sistema de catálogo digital para **DIFERPA S.A.C.**, empresa ferretera peruana. Desarrollado como parte del proyecto de Interacción Humano-Computador (IHC) con alineación al **ODS 10 — Reducción de Desigualdades**, facilitando el acceso a productos de construcción desde cualquier dispositivo.

---

## 📐 Arquitectura

Este proyecto implementa **Clean Architecture** con separación estricta de capas:

```
src/
├── application/          # Casos de uso (lógica de negocio)
│   ├── auth.module.ts    # Módulo de autenticación JWT
│   └── use-cases/        # GetCatalog, GetProductDetail, GetProductTypes
├── domain/               # Entidades e interfaces del dominio
├── infrastructure/       # Persistencia: TypeORM + MySQL
│   └── persistence/
│       ├── entities/     # Product, ProductType
│       └── repositories/ # Implementaciones TypeORM
├── presentation/         # Controladores HTTP
│   └── controllers/      # ProductController, ProductTypeController
├── app.module.ts         # Módulo raíz
├── logger.middleware.ts  # Middleware de logging
└── main.ts               # Bootstrap con seguridad (Helmet + Rate Limit)
```

---

## ✅ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior
- [XAMPP](https://www.apachefriends.org/) con MySQL activo (o cualquier servidor MySQL)
- [npm](https://www.npmjs.com/) v9 o superior

---

## ⚙️ Configuración del Entorno

Crea un archivo `.env` copiando el archivo de ejemplo incluido en el repositorio:

```bash
copy .env.example .env
```

Luego edita el `.env` con los valores de tu entorno:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=diferpa_db

# Servidor
PORT=3001

# CORS
CORS_ORIGIN=http://localhost:4200
```

> **Nota:** Con `synchronize: true` activado en TypeORM, las tablas se crean automáticamente al iniciar el servidor. No necesitas ejecutar migraciones manualmente.

---

## 🚀 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# 3. Iniciar en modo producción
npm run start:prod
```

El servidor estará disponible en: **`http://localhost:3001`**

---

## 🛡️ Seguridad Implementada

Este backend incluye las siguientes medidas de seguridad aplicadas mediante las prácticas de `api-security-best-practices`:

| Medida | Descripción |
|---|---|
| **Helmet** | Cabeceras HTTP de seguridad contra XSS y Clickjacking |
| **Rate Limiting** | Máximo 100 peticiones por IP cada 15 minutos |
| **JWT Auth** | Tokens de acceso con expiración de 60 minutos |
| **bcrypt** | Encriptación segura de contraseñas |
| **CORS** | Restricción de origen a `http://localhost:4200` |

---

## 📡 Endpoints de la API

Base URL: `http://localhost:3001`

### Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/products` | Obtiene todos los productos del catálogo |
| `GET` | `/products?category={nombre}` | Filtra productos por categoría |
| `GET` | `/products/:idAlmacen/:idFabrica` | Obtiene el detalle de un producto específico |

### Tipos de Producto

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/product-types` | Obtiene todas las categorías disponibles |

---

## 🧰 Tecnologías Utilizadas

- **Framework:** NestJS (Node.js)
- **Lenguaje:** TypeScript
- **ORM:** TypeORM
- **Base de Datos:** MySQL (via XAMPP)
- **Autenticación:** JWT + Passport.js
- **Seguridad:** Helmet, express-rate-limit, bcrypt
- **Arquitectura:** Clean Architecture

---

## 🔗 Repositorios Relacionados

| Repo | Enlace |
|------|--------|
| 🌐 **Frontend** | [Interaccion-Humano-Computador-Frontend](https://github.com/Minato57/Interaccion-Humano-Computador-Frontend) |
| ⚙️ **Backend** (este repo) | [Interaccion-Humano-Computador-Backend](https://github.com/Minato57/Interaccion-Humano-Computador-Backend) |

---

## 👥 Equipo

Proyecto desarrollado para el curso de **Interacción Humano-Computador** — Universidad.

---

## 📄 Licencia

Este proyecto es de uso académico.
