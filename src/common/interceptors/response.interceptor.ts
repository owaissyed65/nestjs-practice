// src/common/interceptors/response.interceptor.ts

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponseDto } from '../dto/api-response.dto';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDto<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        errors: [],
        message: 'Request processed successfully',
        status: context.switchToHttp().getResponse().statusCode.toString(),
        isSuccessful: true,
      })),
      catchError((err) => {
        const response = context.switchToHttp().getResponse();

        // Determine the status code based on the error type
        let statusCode = 500; // Default to 500 Internal Server Error
        let message = 'Something went wrong';

        if (err instanceof BadRequestException) {
          statusCode = 400;
          message = err.message || 'Invalid request';
        } else if (err instanceof NotFoundException) {
          statusCode = 404;
          message = err.message || 'Resource not found';
        } else if (err instanceof InternalServerErrorException) {
          statusCode = 500;
          message = err.message || 'Internal server error';
        }

        response.status(statusCode).json({
          data: null,
          errors: [message],
          message: 'Request failed',
          status: statusCode.toString(),
          isSuccessful: false,
        });

        return throwError(() => err); // Re-throw the error after handling it
      }),
    );
  }
}
