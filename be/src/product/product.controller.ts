import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  ParseFilePipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { diskStorage } from 'multer';
import e, { Response } from 'express';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('urlImg', {
      storage: diskStorage({
        destination: './upload',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async create(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    body.categoryId = parseInt(body.categoryId);
    body.price = parseInt(body.price);
    body.count = parseInt(body.count);
    body.urlImg = `http://localhost:3000/product/image/${file.originalname}`;

    return this.productService.create(body);
  }

  @Get('image/:filename')
  seeUploadedFile(@Param('filename') image, @Res() res) {
    return res.sendFile(image, { root: './upload' });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('urlImg', {
      storage: diskStorage({
        destination: './upload',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFileAndPassValidation(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [],
      }),
    )
    file: Express.Multer.File,
  ) {
    body.categoryId = parseInt(body.categoryId);
    body.price = parseInt(body.price);
    body.count = parseInt(body.count);
    body.urlImg = `http://localhost:3000/product/image/${file.originalname}`;
    return this.productService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
