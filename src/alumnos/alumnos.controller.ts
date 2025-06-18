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
import { catchError, Observable } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagionation.dto';
import { NATS_SERVICE } from 'src/config/services';
import { RpcError } from '../common/dto/rpc-error.dto';
import {
  AlumnoResponse,
  AlumnosListResponse,
  CreateAlumnoDto,
  UpdateAlumnoDto,
} from './dto';
import { ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('alumnos')
export class AlumnosController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo alumno' })
  createAlumno(
    @Body() createAlumnoDto: CreateAlumnoDto,
  ): Observable<AlumnoResponse> {
    return this.client.send({ cmd: 'create_alumno' }, createAlumnoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de alumnos con paginación' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página (por defecto: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Límite de elementos por página (por defecto: 10)',
  })
  getAlumnos(
    @Query() paginationDto: PaginationDto,
  ): Observable<AlumnosListResponse[]> {
    return this.client.send({ cmd: 'find_all_alumnos' }, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un alumno por ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del alumno' })
  getAlumnoById(@Param('id') id: string): Observable<AlumnoResponse> {
    return this.client
      .send<AlumnoResponse>({ cmd: 'find_one_alumno' }, { id })
      .pipe(
        catchError((error: RpcError) => {
          throw new RpcException(error);
        }),
      );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un alumno existente' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID del alumno a actualizar',
  })
  updateAlumno(
    @Param('id') id: string,
    @Body() updateAlumnoDto: UpdateAlumnoDto,
  ): Observable<AlumnoResponse> {
    return this.client
      .send<AlumnoResponse>(
        { cmd: 'update_alumno' },
        { id: +id, ...updateAlumnoDto },
      )
      .pipe(
        catchError((error: RpcError) => {
          console.log('Error updating alumno:', error);
          throw new RpcException(error);
        }),
      );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un alumno' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID del alumno a eliminar',
  })
  deleteAlumno(@Param('id') id: number) {
    return this.client
      .send<{ message: string }>({ cmd: 'remove_alumno' }, { id })
      .pipe(
        catchError((error: RpcError) => {
          console.log('Error deleting alumno:', error);
          throw new RpcException(error);
        }),
      );
  }

  @Post('seed')
  @ApiOperation({ summary: 'Poblar la base de datos con datos de prueba' })
  seedAlumnos() {
    return this.client.send<{
      message: string;
      count: number;
    }>({ cmd: 'seed_alumnos' }, {});
  }
}
