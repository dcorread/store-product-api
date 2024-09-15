import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity/producto.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['tiendas'] });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({ where: { id }, relations: ['tiendas'] });
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    return producto;
  }

  async create(data: Partial<Producto>): Promise<Producto> {
    if (data.tipo !== 'Perecedero' && data.tipo !== 'No perecedero') {
      throw new BadRequestException('El tipo de producto no es válido');
    }
    const nuevoProducto = this.productoRepository.create(data);
    return this.productoRepository.save(nuevoProducto);
  }

  async update(id: number, data: Partial<Producto>): Promise<Producto> {
    const producto = await this.findOne(id);
    if (data.tipo && data.tipo !== 'Perecedero' && data.tipo !== 'No perecedero') {
      throw new BadRequestException('El tipo de producto no es válido');
    }
    Object.assign(producto, data);
    return this.productoRepository.save(producto);
  }

  async delete(id: number): Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
  }
}
