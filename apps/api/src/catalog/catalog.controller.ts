import { Controller, Get } from '@nestjs/common';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}

  @Get('categorias')
  categorias() { return this.catalog.listarCategorias(); }

  @Get('marcas')
  marcas() { return this.catalog.listarMarcas(); }

  @Get('productos')
  productos() { return this.catalog.listarProductos(); }
}
