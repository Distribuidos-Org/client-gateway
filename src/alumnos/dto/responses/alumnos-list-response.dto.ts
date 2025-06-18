import { Alumno } from 'src/alumnos/interfaces/alumno.interface.ts';

export interface AlumnosListResponse {
  total: number;
  page: number;
  limit: number;
  data: Alumno[];
}
