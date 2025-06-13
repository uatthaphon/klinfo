import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        return {
          success: true,
          code: response?.code || 'SUCCESS_DEFAULT',
          message: response?.message || 'Success',
          data: response?.data ?? response,
        };
      }),
    );
  }
}
