import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/producto.entity/producto.entity';
import { Tienda } from './tienda/tienda.entity/tienda.entity';

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
})
export class AppModule {}
