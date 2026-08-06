import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Producto } from './producto.entity';

@Entity({ name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 120, unique: true })
  slug: string;

  @Column({ name: 'categoria_padre_id', type: 'int', nullable: true })
  categoriaPadreId: number | null;

  @ManyToOne(() => Categoria, (categoria) => categoria.subcategorias, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoria_padre_id' })
  categoriaPadre: Categoria | null;

  @OneToMany(() => Categoria, (categoria) => categoria.categoriaPadre)
  subcategorias: Categoria[];

  @OneToMany(() => Producto, (producto) => producto.categoria)
  productos: Producto[];

  @Column({ name: 'imagen_url', length: 255, nullable: true })
  imagenUrl: string | null;

  @Column({ type: 'int', default: 0 })
  orden: number;

  @Column({ default: true })
  activa: boolean;

  @Column({ name: 'meta_title', length: 150, nullable: true })
  metaTitle: string | null;

  @Column({ name: 'meta_description', length: 300, nullable: true })
  metaDescription: string | null;
}
