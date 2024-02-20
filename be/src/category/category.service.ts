import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/categoryDto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class CategoryService {
  constructor(private prismaService: PrismaService) {}
  async create(dto: CategoryDto) {
    try {
      const category = await this.prismaService.category.create({
        data: {
          name: dto.name,
        },
        select: {
          id: true,
          name: true,
          products: true,
        },
      });

      return category;
    } catch (error) {
      throw new ExceptionsHandler(error.message);
    }
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.prismaService.category.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        products: true,
      },
    });
    return categories;
  }

  async findOne(id: number): Promise<CategoryDto> {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        products: true,
      },
    });
    return category;
  }

  async update(id: number, dto: CategoryDto) {
    const note = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    if (!note) {
      throw new ForbiddenException('Cannot find category to update');
    }
    return await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
      },
    });
  }

  async remove(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) {
      throw new ForbiddenException('Cannot find category to delete');
    }

    return this.prismaService.category.delete({
      where: {
        id: id,
      },
    });
  }
}
