import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentModule } from './department/department.module';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as deepLimit from 'graphql-depth-limit';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { appConfig } from './shared/src';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      formatError: ({ message, extensions }) => {
        const statusCode = extensions?.originalError?.['statusCode']
        return { message: extensions?.originalError?.['message'] || message, statusCode }
      },
      graphiql: true,
      context: ({ req }) => ({ req }),
      validationRules: [
        deepLimit(5),
      ],
      csrfPrevention: true,
    }),
    DatabaseModule,
    DepartmentModule,
    AuthModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
