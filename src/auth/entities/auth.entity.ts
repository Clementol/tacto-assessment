import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  username!: string;

  @Column({})
  password!: string
}
