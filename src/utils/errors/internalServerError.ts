import { HttpStatus } from "../enums/httpStatusEnum";
import { getHttpErrorClassArgs } from "../../helpers/httpErrorsHelper"; 
import { HttpError, HttpErrorMessageArgs } from "./httpError";

export class InternalServerError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Internal server error") {
    super(getHttpErrorClassArgs(args, HttpStatus.INTERNAL_SERVER_ERROR));

    this.name = "InternalServerError";
  }
}
