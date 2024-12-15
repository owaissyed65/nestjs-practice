export class ApiResponseDto<T> {
  data: T;
  errors: string[];
  message: string;
  status: string;
  isSuccessful: boolean;
}
