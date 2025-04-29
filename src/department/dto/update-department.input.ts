import { Field, InputType, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateDepartmentInput, CreateSubDepartmentInput } from './create-department.input';

@InputType()
export class UpdateDepartmentInput extends PartialType(CreateDepartmentInput) {
  @Field(() => Int)
  @IsNotEmpty()
  id!: number;
}

@InputType()
export class UpdateSubDepartmentInput extends PartialType(CreateSubDepartmentInput) {}

@ObjectType()
export class DeleteMessage {
  @Field()
  message!: string;
}