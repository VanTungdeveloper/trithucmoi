import { ForbiddenException, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: ProductDto) {
    try {
      console.log(dto);
      const product = await this.prismaService.product.create({
        data: {
          ...dto,
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
    });
    return products;
  }

  async findOne(id: number): Promise<ProductDto> {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
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

  async getByCondition(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prismaService.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
