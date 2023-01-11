import { HttpStatus } from "../enums/httpStatusEnum";
import { HttpError, HttpErrorMessageArgs } from "./httpError";
import { getHttpErrorClassArgs } from '../../helpers/httpErrorsHelper';

export class NotFoundError extends HttpError {
  constructor(args: string | HttpErrorMessageArgs = "Not found") {
    super(getHttpErrorClassArgs(args, HttpStatus.NOT_FOUND));

    this.name = "NotFoundError";
  }
}
