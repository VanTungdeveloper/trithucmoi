import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(dto: ProductDto): Promise<ProductDto> {
    const product = await this.productRepo.save(dto);
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<ProductDto[]> {
    const product: ProductDto[] = await this.productRepo.find();

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateDto: ProductDto,
  ): Promise<{ message: string }> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.productRepo.update(id, updateDto);
    return {
      message: 'update product success!',
    };
  }

  async remove(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('User not found');
    }
    this.productRepo.remove(product);
    return {
      message: 'Delete success!',
    };
  }
}
