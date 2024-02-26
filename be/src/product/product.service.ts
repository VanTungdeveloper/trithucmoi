import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: ProductDto) {
    try {
      const product = await this.prismaService.product.create({
        data: {
          name: dto.name,
          price: dto.price,
          description: dto.description,
          count: dto.count,
          urlImg: dto.urlImg,
          categoryId: dto.categoryId,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          count: true,
          urlImg: true,
          categoryId: true,
        },
      });
      return product;
    } catch (error) {
      throw new ExceptionsHandler(error.message);
    }
  }

  async findAll() {
    const products = await this.prismaService.product.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        count: true,
        urlImg: true,
        categoryId: true,
      },
    });
    return products;
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        count: true,
        price: true,
        description: true,
        urlImg: true,
        categoryId: true,
      },
    });
    return product;
  }

  async update(id: number, updateDto: ProductDto) {
    console.log(id);
    const product = this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ForbiddenException('Cannot find product to update');
    }
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: { ...updateDto },
    });
  }

  async remove(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new ForbiddenException('Cannot find product to delete');
    }

    return this.prismaService.product.delete({
      where: {
        id: id,
      },
    });
  }
}
