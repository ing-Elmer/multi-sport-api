import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [
    BullModule.forRoot({
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.HOST_BD,
      port: parseInt(process.env.PORT_BD),
      username: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      database: process.env.DATABASE_BD,
      entities: [__dirname + process.env.ENTITIES_BD],
      extra: {
        trustServerCertificate: true
      }
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
