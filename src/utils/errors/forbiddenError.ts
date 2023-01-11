import { HttpStatus } from "../enums/httpStatusEnum";
import { getHttpErrorClassArgs } from "../../helpers/httpErrorsHelper";
import { HttpError, HttpErrorMessageArgs } from "./httpError";

export class ForbiddenError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Forbidden") {
    super(getHttpErrorClassArgs(args, HttpStatus.FORBIDDEN));

    this.name = "ForbiddenError";
  }
}
