import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as sql from 'mssql';
@Injectable()

export class UsersService {
  private readonly logger = new Logger('usersService');
  
  async create(createUserDto: CreateUserDto) {
    const config = {
      user: 'Elmer',
      password: 'admin',
      server: 'DESKTOP-TAIIPHE\\SQLEXPRESS',
      database: 'bdMultiSportPro',
      options: {
        trustServerCertificate: true
      }
    };
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
      request.input('id_card', sql.VarChar(20), createUserDto.id_card);
      request.input('first_name', sql.VarChar(100), createUserDto.first_name);
      request.input('last_name', sql.VarChar(100), createUserDto.last_name);
      request.input('email', sql.VarChar(150), createUserDto.email);
      request.input('role', sql.VarChar(20), createUserDto.role || 'user');
      request.input('password', sql.VarChar(150), createUserDto.password);
      request.input('otp', sql.VarChar(200), createUserDto.otp || null);
      request.input('terms_and_conditions', sql.Bit, createUserDto.terms_and_conditions || 0);

      // Parámetros de salida
      request.output('IDRETURN', sql.Int);
      request.output('ERRORID', sql.Int);
      request.output('ERRORDESCRIPCION', sql.NVarChar(sql.MAX)); 

      const result = await request.execute('SP_INSERT_USER');

      if (result.output.ERRORID !== 0) {
        throw new BadRequestException(result.output.ERRORDESCRIPCION);
      }

      return 'Usuario creado correctamente';
    }catch (error) {
      console.error('Error al ejecutar SP_INSERT_USER:', error);
      this.handleDBException(error) ;
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
    if (error.code === '23505') 
      throw new BadRequestException(error.detail);
    
    if (error.message){
      this.logger.error(error.message);

      throw new BadRequestException(error.message);
    }else{
      this.logger.error(error);
      throw new InternalServerErrorException('Ocurrió un error inesperado');
    }
    

  }
}
