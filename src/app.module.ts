import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'DESKTOP-TAIIPHE\\SQLEXPRESS',
      port: 1433,
      username: 'Elmer',
      password: 'admin',
      database: 'bdMultiSportPro',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        trustServerCertificate: true
      }
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
