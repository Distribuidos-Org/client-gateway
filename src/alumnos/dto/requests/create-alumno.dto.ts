import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Nombre del alumno',
    minLength: 2,
    maxLength: 50,
    example: 'Juan',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;

  @ApiProperty({
    description: 'Apellido paterno del alumno',
    minLength: 2,
    maxLength: 50,
    example: 'Pérez',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  apellidoPaterno: string;

  @ApiPropertyOptional({
    description: 'Apellido materno del alumno',
    maxLength: 50,
    example: 'García',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  apellidoMaterno?: string;

  @ApiProperty({
    description: 'DNI del alumno (8 dígitos)',
    minLength: 8,
    maxLength: 8,
    example: '12345678',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  dni: string;

  @ApiPropertyOptional({
    description: 'Edad del alumno',
    example: 22,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  edad?: number;

  @ApiProperty({
    description: 'Correo electrónico del alumno',
    maxLength: 100,
    example: 'juan.perez@example.com',
  })
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiPropertyOptional({
    description: 'Número de celular del alumno',
    maxLength: 15,
    example: '+51987654321',
  })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  celular?: string;

  @ApiPropertyOptional({
    description: 'Universidad del alumno',
    maxLength: 100,
    example: 'Universidad Nacional Mayor de San Marcos',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  universidad?: string;

  @ApiPropertyOptional({
    description: 'Facultad del alumno',
    maxLength: 100,
    example: 'Facultad de Ingeniería de Sistemas',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  facultad?: string;

  @ApiPropertyOptional({
    description: 'Profesión del alumno',
    maxLength: 50,
    example: 'Ingeniero de Software',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  profesion?: string;

  @ApiPropertyOptional({
    description: 'Grado académico del alumno',
    maxLength: 50,
    example: 'Bachiller',
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  grado?: string;

  @ApiPropertyOptional({
    description: 'Indica si el alumno es egresado local',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  egresadoLocal?: boolean;

  @ApiProperty({
    description: 'Contraseña del alumno',
    minLength: 6,
    maxLength: 60,
    example: 'password123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(60)
  contrasena: string;
}
