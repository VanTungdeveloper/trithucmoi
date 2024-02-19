import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserDto } from "../dto/userDto.dto";
import { Expose, classToPlain, plainToClass, plainToInstance } from "class-transformer";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        default: ''
    })
    name:string

    @Column({
        default: null
    })
    age: number
    
    @Column({
        default: null
    })
    address: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: "USER",
        enum: ["ADMIN", "USER"]
    })
    role: string

}
