export interface Alumno {
  alumnoId?: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  dni: string;
  edad?: number;
  email: string;
  celular?: string;
  universidad?: string;
  facultad?: string;
  profesion?: string;
  grado?: string;
  egresadoLocal?: boolean;
  contrasena: string;
}
