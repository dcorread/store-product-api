import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.entity/producto.entity';
import { ProductoController } from './producto/producto.controller';
import { ProductoService } from './producto/producto.service';
import { Tienda } from './tienda/tienda.entity/tienda.entity';
import { TiendaController } from './tienda/tienda.controller';
import { TiendaService } from './tienda/tienda.service';
import { ProductStoreService } from './product-store/product-store.service';
import { ProductStoreController } from './product-store/product-store.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'store_product.db',
      entities: [Producto, Tienda],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Producto, Tienda]),
  ],
  providers: [ProductStoreService, ProductoService, TiendaService],
  controllers: [ProductStoreController, ProductoController, TiendaController],
})
export class AppModule {}
