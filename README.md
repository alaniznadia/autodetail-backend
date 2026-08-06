# AutoDetail Pro Backend

Base inicial del backend del e-commerce de detailing automotor.

## Requisitos

- Node.js 20+
- pnpm 9+
- Docker

## Instalación

```bash
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm install
cp .env.example .env
pnpm db:up
```

## Desarrollo

```bash
pnpm --filter @autodetail/api dev
```

API: `http://localhost:3001/api`

## Base de datos

```bash
pnpm --filter @autodetail/api migration:run
```

Las migraciones usan TypeORM 0.3 y `synchronize: false`. Nunca subas credenciales reales al repositorio.

## Próximos módulos

Catálogo, stock multi-depósito, pedidos, pagos, envíos, clientes, reportes, notificaciones, permisos y auditoría.
