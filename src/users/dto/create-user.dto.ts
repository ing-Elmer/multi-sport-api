import { IsBoolean, IsDate, IsEmail, IsEmpty, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString({message: 'La cedula debe ser un texto'})
    @MinLength(9, {message: 'La cedula debe tener al menos 9 caracteres'})
    @MaxLength(20 , {message: 'La cedula debe tener como máximo 20 caracteres'})
    @IsNotEmpty( {message: 'La cedula es requerida'})
    id_card: string;

    @IsNotEmpty( {message: 'El nombre es requerido'})
    @IsString( {message: 'El nombre debe ser un texto'})
    @MaxLength(100 , {message: 'El nombre debe tener como máximo 100 caracteres'})
    first_name: string;


    @IsNotEmpty( {message: 'El apellido es requerido'})
    @IsString( {message: 'El apellido debe ser un texto'})
    @MaxLength(100 , {message: 'El apellido debe tener como máximo 100 caracteres'})
    last_name: string;

    @IsNotEmpty( {message: 'El correo es requerido'})
    @IsEmail({}, {message: 'El correo debe ser un correo válido'})
    @MaxLength(150 , {message: 'El correo debe tener como máximo 150 caracteres'})
    email: string;


    @IsOptional( )
    @IsString( {message: 'El teléfono debe ser un texto'})
    @MaxLength(100 , {message: 'El teléfono debe tener como máximo 100 caracteres'})
    phone: string;

    @IsOptional()
    @IsDate( {message: 'La fecha de nacimiento debe ser una fecha valida'})
    date_of_birth: Date;
    

    @IsOptional()
    @IsString( {message: 'El rol debe ser un texto'})
    @IsIn(['admin', 'user'] , {message: 'El rol debe ser admin o user'})
    role : string;

    @IsNotEmpty( {message: 'La contraseña es requerida'})
    @IsString( {message: 'La contraseña debe ser un texto'})
    @MinLength(8 , {message: 'La contraseña debe tener al menos 8 caracteres'})
    @MaxLength(20 , {message: 'La contraseña debe tener como máximo 20 caracteres'})
    password: string;

    @IsOptional( {message: 'El otp es requerido'})
    @IsString( {message: 'El otp debe ser un texto'})
    otp : string;

    @IsOptional()
    @IsString( {message: 'El token de recuperación debe ser un texto'})
    recover_token : string;

    @IsOptional()
    @IsString( {message: 'La imagen debe ser un texto'})
    image: string;

    @IsOptional()
    @IsBoolean( {message: 'Los términos y condiciones deben ser un booleano'})
    terms_and_conditions: boolean;

    @IsOptional()
    @IsBoolean( {message: 'El correo ha sido verificado'})
    verified: boolean;

    @IsOptional()
    @IsBoolean( {message: 'El estado debe ser un booleano'})
    status: boolean;
}
