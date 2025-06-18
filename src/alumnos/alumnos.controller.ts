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
import { CreateAlumnoDto } from './dto/requests/create-alumno.dto';
import { UpdateAlumnoDto } from './dto/requests/update-alumno.dto';
import { AlumnoResponse } from './dto/responses/alumno-response.dto';
import { AlumnosListResponse } from './dto/responses/alumnos-list-response.dto';

@Controller('alumnos')
export class AlumnosController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createAlumno(
    @Body() createAlumnoDto: CreateAlumnoDto,
  ): Observable<AlumnoResponse> {
    return this.client.send({ cmd: 'create_alumno' }, createAlumnoDto);
  }

  @Get()
  getAlumnos(
    @Query() paginationDto: PaginationDto,
  ): Observable<AlumnosListResponse[]> {
    return this.client.send({ cmd: 'find_all_alumnos' }, paginationDto);
  }

  @Get(':id')
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
  seedAlumnos() {
    return this.client.send<{
      message: string;
      count: number;
    }>({ cmd: 'seed_alumnos' }, {});
  }
}
