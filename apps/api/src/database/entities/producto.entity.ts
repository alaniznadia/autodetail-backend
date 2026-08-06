import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';
import { Marca } from './marca.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  sku: string;

  @Column({ length: 200 })
  nombre: string;

  @Column({ length: 220, unique: true })
  slug: string;

  @Column({ name: 'descripcion_corta', length: 300, nullable: true })
  descripcionCorta: string | null;

  @Column({ name: 'descripcion_larga', type: 'text', nullable: true })
  descripcionLarga: string | null;

  @Column({ name: 'marca_id', type: 'int', nullable: true })
  marcaId: number | null;

  @ManyToOne(() => Marca, (marca) => marca.productos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'marca_id' })
  marca: Marca | null;

  @Column({ name: 'categoria_id', type: 'int', nullable: true })
  categoriaId: number | null;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria | null;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  precio: string;

  @Column({ name: 'precio_costo', type: 'numeric', precision: 12, scale: 2, default: 0 })
  precioCosto: string;

  @Column({ name: 'precio_promocional', type: 'numeric', precision: 12, scale: 2, nullable: true })
  precioPromocional: string | null;

  @Column({ name: 'peso_kg', type: 'numeric', precision: 8, scale: 3, default: 0 })
  pesoKg: string;

  @Column({ name: 'alto_cm', type: 'numeric', precision: 8, scale: 2, nullable: true })
  altoCm: string | null;

  @Column({ name: 'ancho_cm', type: 'numeric', precision: 8, scale: 2, nullable: true })
  anchoCm: string | null;

  @Column({ name: 'largo_cm', type: 'numeric', precision: 8, scale: 2, nullable: true })
  largoCm: string | null;

  @Column({ name: 'stock_minimo', type: 'int', default: 5 })
  stockMinimo: number;

  @Column({ default: false })
  destacado: boolean;

  @Column({ name: 'oferta_del_dia', default: false })
  ofertaDelDia: boolean;

  @Column({ default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
