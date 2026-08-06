import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../database/entities/categoria.entity';
import { Marca } from '../database/entities/marca.entity';
import { Producto } from '../database/entities/producto.entity';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Categoria) private readonly categorias: Repository<Categoria>,
    @InjectRepository(Marca) private readonly marcas: Repository<Marca>,
    @InjectRepository(Producto) private readonly productos: Repository<Producto>,
  ) {}

  listarCategorias() {
    return this.categorias.find({
      where: { activa: true },
      relations: { categoriaPadre: true },
      order: { orden: 'ASC', nombre: 'ASC' },
    });
  }

  listarMarcas() {
    return this.marcas.find({ where: { activa: true }, order: { nombre: 'ASC' } });
  }

  listarProductos() {
    return this.productos.find({
      where: { activo: true },
      relations: { marca: true, categoria: true },
      order: { createdAt: 'DESC' },
    });
  }
}
