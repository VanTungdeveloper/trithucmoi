import { IsNotEmpty } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDto } from '../dto/product.dto';
import { classToPlain, plainToClass, plainToInstance } from 'class-transformer';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  manufacture: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  count: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  urlImg: string;
}
