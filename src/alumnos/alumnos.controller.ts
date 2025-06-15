import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagionation.dto';
import { ALUMNOS_SERVICE } from 'src/config/services';
import { RpcError } from './dto/rpc-error.dto';
import { CreateAlumnoDto } from './dto/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/update-alumno.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(
    @Inject(ALUMNOS_SERVICE) private readonly alumnosClient: ClientProxy,
  ) {}

  @Post()
  createAlumno(@Body() createAlumnoDto: CreateAlumnoDto) {
    return this.alumnosClient.send({ cmd: 'create_alumno' }, createAlumnoDto);
  }

  @Get()
  getAlumnos(@Query() paginationDto: PaginationDto) {
    return this.alumnosClient.send({ cmd: 'find_all_alumnos' }, paginationDto);
  }

  @Get(':id')
  getAlumnoById(@Param('id') id: string) {
    return this.alumnosClient.send({ cmd: 'find_one_alumno' }, { id }).pipe(
      catchError((error: RpcError) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  updateAlumno(
    @Param('id') id: string,
    @Body() updateAlumnoDto: UpdateAlumnoDto,
  ) {
    return this.alumnosClient
      .send({ cmd: 'update_alumno' }, { id: id, ...updateAlumnoDto })
      .pipe(
        catchError((error: RpcError) => {
          console.log('Error updating alumno:', error);
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  deleteAlumno(@Param('id') id: number) {
    return this.alumnosClient.send({ cmd: 'remove_alumno' }, { id }).pipe(
      catchError((error: RpcError) => {
        console.log('Error deleting alumno:', error);
        throw new RpcException(error);
      }),
    );
  }

  @Post('seed')
  seedAlumnos() {
    return this.alumnosClient.send({ cmd: 'seed_alumnos' }, {});
  }
}
