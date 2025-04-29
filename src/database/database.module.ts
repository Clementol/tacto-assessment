import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.getOrThrow('POSTGRES_URL'),
                // password: configService.getOrThrow('POSTGRES_PASSWORD'),
                // host: configService.getOrThrow('POSTGRES_HOST'),
                // port: configService.getOrThrow('POSTGRES_PORT'),
                // database: configService.getOrThrow('POSTGRES_DB'),
                // username: configService.getOrThrow('POSTGRES_USER'),
                // password: configService.getOrThrow('POSTGRES_PASSWORD'),
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                ssl: true,
                autoLoadEntities: true,
                synchronize: true// Not advisable for prod
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}
