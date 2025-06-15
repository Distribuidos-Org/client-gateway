import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  apellidoPaterno: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  apellidoMaterno?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  edad?: number;

  @IsEmail()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(15)
  celular?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  universidad?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  facultad?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  profesion?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  grado?: string;

  @IsOptional()
  @IsBoolean()
  egresadoLocal?: boolean;

  @IsString()
  @MinLength(6)
  @MaxLength(60)
  contrasena: string;
}
