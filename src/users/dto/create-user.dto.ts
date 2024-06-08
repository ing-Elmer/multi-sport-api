import { IsBoolean, IsDate, IsEmail, IsEmpty, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @MinLength(9)
    @MaxLength(20)
    @IsNotEmpty()
    id_card: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    first_name: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    last_name: string;

    @IsNotEmpty()
    @IsEmail()
    @MaxLength(150)
    email: string;


    @IsOptional()
    @IsString()
    @MaxLength(100)
    phone: string;

    @IsOptional()
    @IsDate()
    date_of_birth: Date;
    

    @IsOptional()
    @IsString()
    @IsIn(['admin', 'user'])
    role : string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsOptional()
    @IsString()
    otp : string;

    @IsOptional()
    @IsString()
    recover_token : string;

    @IsOptional()
    @IsString()
    image: string;

    @IsOptional()
    @IsBoolean()
    terms_and_conditions: boolean;

    @IsOptional()
    @IsBoolean()
    verified: boolean;

    @IsOptional()
    @IsBoolean()
    status: boolean;
}
