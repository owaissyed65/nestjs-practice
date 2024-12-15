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

        // Determine the status code based on the error
        const statusCode =
          err instanceof InternalServerErrorException
            ? 500
            : err instanceof NotFoundException
              ? 404
              : err instanceof BadRequestException
                ? 400
                : 500;

        response.status(statusCode); // Set the response status code
        console.log(err);
        return throwError(
          () =>
            ({
              data: null,
              errors: [err.message || 'Something went wrong'],
              message: 'Request failed',
              status: statusCode.toString(),
              isSuccessful: false,
            }) as ApiResponseDto<T>,
        );
      }),
    );
  }
}
