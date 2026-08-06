import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCatalog1710000000000 implements MigrationInterface {
  name = 'CreateCatalog1710000000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await queryRunner.query(`
      CREATE TABLE marcas (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(120) NOT NULL UNIQUE,
        logo_url VARCHAR(255),
        activa BOOLEAN NOT NULL DEFAULT true
      )
    `);
    await queryRunner.query(`
      CREATE TABLE categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL UNIQUE,
        slug VARCHAR(120) NOT NULL UNIQUE,
        categoria_padre_id INT REFERENCES categorias(id) ON DELETE SET NULL,
        imagen_url VARCHAR(255),
        orden INT NOT NULL DEFAULT 0,
        activa BOOLEAN NOT NULL DEFAULT true,
        meta_title VARCHAR(150),
        meta_description VARCHAR(300)
      )
    `);
    await queryRunner.query(`
      CREATE TABLE productos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        sku VARCHAR(50) NOT NULL UNIQUE,
        nombre VARCHAR(200) NOT NULL,
        slug VARCHAR(220) NOT NULL UNIQUE,
        descripcion_corta VARCHAR(300),
        descripcion_larga TEXT,
        marca_id INT REFERENCES marcas(id) ON DELETE SET NULL,
        categoria_id INT REFERENCES categorias(id) ON DELETE SET NULL,
        precio NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (precio >= 0),
        precio_costo NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (precio_costo >= 0),
        precio_promocional NUMERIC(12,2),
        peso_kg NUMERIC(8,3) NOT NULL DEFAULT 0,
        alto_cm NUMERIC(8,2),
        ancho_cm NUMERIC(8,2),
        largo_cm NUMERIC(8,2),
        stock_minimo INT NOT NULL DEFAULT 5,
        destacado BOOLEAN NOT NULL DEFAULT false,
        oferta_del_dia BOOLEAN NOT NULL DEFAULT false,
        activo BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);
    await queryRunner.query('CREATE INDEX idx_productos_marca ON productos(marca_id)');
    await queryRunner.query('CREATE INDEX idx_productos_categoria ON productos(categoria_id)');
    await queryRunner.query('CREATE INDEX idx_productos_activo ON productos(activo)');
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS productos');
    await queryRunner.query('DROP TABLE IF EXISTS categorias');
    await queryRunner.query('DROP TABLE IF EXISTS marcas');
  }
}
