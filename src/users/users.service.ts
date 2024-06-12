import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as sql from 'mssql';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('usersService');

  constructor(private readonly mailService: MailService) {}

  async create(createUserDto: CreateUserDto) {
    const config = {
      user: process.env.USER_BD,
      password: process.env.PASSWORD_BD,
      server: process.env.HOST_BD,
      database: process.env.DATABASE_BD,
      options: {
        trustServerCertificate: true,
      },
    };

    let pool;
    let transaction;
    try {
      pool = await sql.connect(config);
      transaction = new sql.Transaction(pool);
      await transaction.begin();
      const request = pool.request();
      request.input('id_card', sql.VarChar(20), createUserDto.id_card);
      request.input('first_name', sql.VarChar(100), createUserDto.first_name);
      request.input('last_name', sql.VarChar(100), createUserDto.last_name);
      request.input('email', sql.VarChar(150), createUserDto.email);
      request.input('role', sql.VarChar(20), createUserDto.role || 'user');
      request.input('password', sql.VarChar(150), createUserDto.password);
      request.input('otp', sql.VarChar(200), createUserDto.otp || null);
      request.input(
        'terms_and_conditions',
        sql.Bit,
        createUserDto.terms_and_conditions || 0,
      );

      // Parámetros de salida
      request.output('IDRETURN', sql.Int);
      request.output('ERRORID', sql.Int);
      request.output('ERRORDESCRIPCION', sql.NVarChar(sql.MAX));

      const result = await request.execute('SP_INSERT_USER');

      if (result.output.ERRORID !== 0) {
        throw new BadRequestException(result.output.ERRORDESCRIPCION);
      }

      await this.mailService.sendEmail(createUserDto.email);

      await transaction.commit();
      return 'Usuario creado correctamente';
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }
      console.error('Error al ejecutar SP_INSERT_USER:', error);
      throw error;
    } finally {
      if (pool) {
        pool.close();
      }
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    if (error.message) {
      this.logger.error(error.message);

      throw new BadRequestException(error.message);
    } else {
      this.logger.error(error);
      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
  }
}
