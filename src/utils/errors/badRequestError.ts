import { HttpStatus } from "../enums/httpStatusEnum";
import { getHttpErrorClassArgs } from "../../helpers/httpErrorsHelper";
import { HttpError, HttpErrorMessageArgs } from "./httpError";

export class BadRequestError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Bad request") {
    super(getHttpErrorClassArgs(args, HttpStatus.BAD_REQUEST));

    this.name = "BadRequestError";
  }
}
