import { HttpStatus } from "../../utils/enums/httpStatusEnum";

export interface ServiceResponse<T> {
  httpStatus: HttpStatus;
  data?: T;
  listData?:T[];
  message?: string;
}

export interface HttpErrorResponse {
  ok: boolean;
  message: string;
  details?: any;
}

export interface HttpResponse<T = any> {
  ok: boolean;
  data: T;
  message?: string;
}
