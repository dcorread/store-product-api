import { Controller, Post, Get, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductStoreService } from './product-store.service';
import { Tienda } from '../tienda/tienda.entity/tienda.entity';
import { Producto } from '../producto/producto.entity/producto.entity';

@Controller('products/:productId/stores')
export class ProductStoreController {
  constructor(private readonly productStoreService: ProductStoreService) {}

  @Post(':storeId')
  async addStoreToProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number
  ): Promise<Producto> {
    return this.productStoreService.addStoreToProduct(productId, storeId);
  }

  @Get()
  async findStoresFromProduct(@Param('productId', ParseIntPipe) productId: number): Promise<Tienda[]> {
    return this.productStoreService.findStoresFromProduct(productId);
  }

  @Get(':storeId')
  async findStoreFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number
  ): Promise<Tienda> {
    return this.productStoreService.findStoreFromProduct(productId, storeId);
  }

  @Post()
  async updateStoresFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() storeIds: number[]
  ): Promise<Producto> {
    return this.productStoreService.updateStoresFromProduct(productId, storeIds);
  }

  @Delete(':storeId')
  async deleteStoreFromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('storeId', ParseIntPipe) storeId: number
  ): Promise<void> {
    return this.productStoreService.deleteStoreFromProduct(productId, storeId);
  }
}
