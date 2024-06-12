import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { BullModule } from '@nestjs/bull';


@Module({
  controllers: [UsersController],
  providers: [UsersService, MailService],
  imports: [
    
    ConfigModule.forRoot(),
     MailModule,
     BullModule.registerQueue({
      name: 'sendMail',
    }),
    ]
})
export class UsersModule {}
