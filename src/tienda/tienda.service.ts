import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tienda } from './tienda.entity/tienda.entity';

@Injectable()
export class TiendaService {
  constructor(
    @InjectRepository(Tienda)
    private readonly tiendaRepository: Repository<Tienda>,
  ) {}

  async findAll(): Promise<Tienda[]> {
    return this.tiendaRepository.find({ relations: ['productos'] });
  }

  async findOne(id: number): Promise<Tienda> {
    const tienda = await this.tiendaRepository.findOne({ where: { id }, relations: ['productos'] });
    if (!tienda) {
      throw new NotFoundException('Tienda no encontrada');
    }
    return tienda;
  }

  async create(data: Partial<Tienda>): Promise<Tienda> {
    if (data.ciudad.length !== 3) {
      throw new BadRequestException('El código de ciudad debe tener tres caracteres');
    }
    const nuevaTienda = this.tiendaRepository.create(data);
    return this.tiendaRepository.save(nuevaTienda);
  }

  async update(id: number, data: Partial<Tienda>): Promise<Tienda> {
    const tienda = await this.findOne(id);
    if (data.ciudad && data.ciudad.length !== 3) {
      throw new BadRequestException('El código de ciudad debe tener tres caracteres');
    }
    Object.assign(tienda, data);
    return this.tiendaRepository.save(tienda);
  }

  async delete(id: number): Promise<void> {
    const tienda = await this.findOne(id);
    await this.tiendaRepository.remove(tienda);
  }
}
