import { HttpStatus } from "../enums/httpStatusEnum";

export interface HttpErrorMessageArgs {
  message: any;
  details?: any;
}

export interface HttpErrorArgs extends HttpErrorMessageArgs {
  httpStatus: number;
}

export class HttpError extends Error {
  public httpStatus: HttpStatus;
  public details: any;

  constructor(args: HttpErrorArgs) {
    super(args.message);

    this.name = "HttpError";
    this.httpStatus = args.httpStatus;
    this.details = args.details ;
  }
}
