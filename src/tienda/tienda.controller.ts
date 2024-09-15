import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { Tienda } from './tienda.entity/tienda.entity';

@Controller('stores')
export class TiendaController {
  constructor(private readonly tiendaService: TiendaService) {}

  @Get()
  async findAll(): Promise<Tienda[]> {
    return this.tiendaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Tienda> {
    return this.tiendaService.findOne(id);
  }

  @Post()
  async create(@Body() tiendaData: Partial<Tienda>): Promise<Tienda> {
    return this.tiendaService.create(tiendaData);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() tiendaData: Partial<Tienda>): Promise<Tienda> {
    return this.tiendaService.update(id, tiendaData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tiendaService.delete(id);
  }
}

