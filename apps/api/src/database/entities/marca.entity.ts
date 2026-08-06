import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Producto } from './producto.entity';

@Entity({ name: 'marcas' })
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ length: 120, unique: true })
  slug: string;

  @Column({ name: 'logo_url', length: 255, nullable: true })
  logoUrl: string | null;

  @Column({ default: true })
  activa: boolean;

  @OneToMany(() => Producto, (producto) => producto.marca)
  productos: Producto[];
}
