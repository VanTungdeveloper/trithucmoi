import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @Expose()
  id: string;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  category: string;

  @Expose()
  @IsNotEmpty()
  manufacture: string;

  @Expose()
  @IsNotEmpty()
  description: string;

  @Expose()
  @IsNotEmpty()
  price: number;

  @Expose()
  @IsNotEmpty()
  count: number;

  @Expose()
  date: Date;

  @Expose()
  @IsNotEmpty()
  urlImg: string;
}
