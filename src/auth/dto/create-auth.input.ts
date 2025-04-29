import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateAuthInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username!: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string
}

@InputType()
export class LoginInput extends CreateAuthInput {}

@ObjectType()
export class AuthPayload {
  @Field()
  accessToken!: string;
}
