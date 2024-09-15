import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../producto/producto.entity/producto.entity';
import { Tienda } from '../tienda/tienda.entity/tienda.entity';

@Injectable()
export class ProductStoreService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async addStoreToProduct(productId: number, storeId: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id: productId }, relations: ['tiendas'] });
    const tienda = await this.tiendaRepository.findOne({ where: { id: storeId } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada');
    }

    producto.tiendas.push(tienda);
    return this.productoRepository.save(producto);
  }

  async findStoresFromProduct(productId: number): Promise<Tienda[]> {
    const producto = await this.productoRepository.findOne({ where: { id: productId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto.tiendas;
  }

  async findStoreFromProduct(productId: number, storeId: number): Promise<Tienda> {
    const producto = await this.productoRepository.findOne({ where: { id: productId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    const tienda = producto.tiendas.find((t) => t.id === storeId);
    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada en el producto');
    }
    return tienda;
  }

  async updateStoresFromProduct(productId: number, storeIds: number[]): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id: productId }, relations: ['tiendas'] });
    const tiendas = await this.tiendaRepository.findByIds(storeIds);

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    producto.tiendas = tiendas;
    return this.productoRepository.save(producto);
  }

  async deleteStoreFromProduct(productId: number, storeId: number): Promise<void> {
    const producto = await this.productoRepository.findOne({ where: { id: productId }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    producto.tiendas = producto.tiendas.filter((t) => t.id !== storeId);
    await this.productoRepository.save(producto);
  }
}
