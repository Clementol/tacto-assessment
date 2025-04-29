import { InputType, Int, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @Field()
  @IsString()
  @MinLength(2)
  name!: string;
}

@InputType()
export class CreateDepartmentInput {

  @Field()
  @IsString()
  @MinLength(2)
  name!: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateSubDepartmentInput)
  subDepartments?: CreateSubDepartmentInput[];
}
