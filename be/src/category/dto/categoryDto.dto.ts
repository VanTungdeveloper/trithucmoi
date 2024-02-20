import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ProductDto } from 'src/product/dto/product.dto';

export class CategoryDto {
  @Expose()
  id: number;

  @IsNotEmpty()
  name: string;

  products?: ProductDto[];
}
