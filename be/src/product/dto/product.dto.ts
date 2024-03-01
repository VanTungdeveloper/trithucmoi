import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  count: number;

  urlImg: string;

  @IsNotEmpty()
  categoryId: number;
}
