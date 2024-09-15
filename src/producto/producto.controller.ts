import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity/producto.entity';

@Controller('products')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Get()
  async findAll(): Promise<Producto[]> {
    return this.productoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return this.productoService.findOne(id);
  }

  @Post()
  async create(@Body() productoData: Partial<Producto>): Promise<Producto> {
    return this.productoService.create(productoData);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() productoData: Partial<Producto>): Promise<Producto> {
    return this.productoService.update(id, productoData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productoService.delete(id);
  }
}
