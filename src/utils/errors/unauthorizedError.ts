import { HttpStatus } from "../enums/httpStatusEnum";
import { getHttpErrorClassArgs } from "../../helpers/httpErrorsHelper"; 
import { HttpError, HttpErrorMessageArgs } from "./httpError";

export class UnauthorizedError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Unauthorized") {
    super(getHttpErrorClassArgs(args, HttpStatus.UNAUTHORIZED));

    this.name = "UnauthorizedError";
  }
}
