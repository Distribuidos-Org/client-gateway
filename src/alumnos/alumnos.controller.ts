import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('alumnos')
export class AlumnosController {
  constructor() {}

  @Post()
  createAlumno() {
    return { message: 'Alumno created successfully' };
  }

  @Get()
  getAlumnos() {
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
    ];
  }

  @Get(':id')
  getAlumnoById() {
    return { id: 1, name: 'John Doe' };
  }

  @Patch(':id')
  updateAlumno() {
    return { message: 'Alumno updated successfully' };
  }

  @Delete(':id')
  deleteAlumno() {
    return { message: 'Alumno deleted successfully' };
  }
}
