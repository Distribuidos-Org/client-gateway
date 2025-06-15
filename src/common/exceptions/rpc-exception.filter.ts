import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface RpcError {
  status: string | number;
  message: string;
}

@Catch(RpcException)
export class RpcExceptionHandler implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();
    console.log('rpcError', rpcError);

    // Verificar si el error tiene la estructura anidada
    if (typeof rpcError === 'object' && rpcError !== null) {
      // Si tiene la estructura: { error: { status, message }, message }
      if ('error' in rpcError && typeof rpcError.error === 'object') {
        const { status, message } = rpcError.error as RpcError;
        const statusCode = isNaN(+status) ? 400 : +status;

        return response.status(statusCode).json({
          status: statusCode,
          message: message,
          timestamp: new Date().toISOString(),
        });
      }

      // Si tiene la estructura directa: { status, message }
      if ('status' in rpcError && 'message' in rpcError) {
        const { status, message } = rpcError as RpcError;
        const statusCode = isNaN(+status) ? 400 : +status;

        return response.status(statusCode).json({
          status: statusCode,
          message: message,
          timestamp: new Date().toISOString(),
        });
      }
    }

    // Fallback para otros casos
    response.status(400).json({
      status: 400,
      message: typeof rpcError === 'string' ? rpcError : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
}
