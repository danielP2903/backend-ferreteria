import { ObjectSchema, ValidationError } from "joi";
import joiDefaultErrorMessagesHelper from "../../helpers/joiDefaultErrorMessagesHelper";
// import { BadRequestError } from "../../utils/errors/badRequestError"; 
import { JoiValidationError } from '../../utils/errors/joi-error';

export interface JoiErrorFieldObject {
  message: string;
  field: string;
}

export class JoiAdapter {
  private readonly _schema: ObjectSchema;
  private readonly _stripUnknown: boolean;

  constructor(schema: ObjectSchema, stripUnknown: boolean = false) {
    this._schema = schema;
    this._stripUnknown = stripUnknown;
  }

  /** Validate and sanitize object */
  public async validate<T>(object: T): Promise<T> {
    try {
      return await this._schema.validateAsync(object, {
        stripUnknown: this._stripUnknown,
        abortEarly: false,
        messages: joiDefaultErrorMessagesHelper,
      });
    } catch (error) {
      const details = this._mapErrors(error as ValidationError);
      // const joiError = new JoiValidationError(details)
      throw new JoiValidationError(
        details
      );
    }
  }

  private _mapErrors(error: ValidationError) {
    return error.details.map(
      (err) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        this._joiErrorFieldObject(
          err.context?.label!,
          err.message.replace(/["]+/g, ""),
        ),
      // eslint-disable-next-line function-paren-newline
    );
  }

  private _joiErrorFieldObject(
    field: string,
    message: string,
  ): JoiErrorFieldObject {
    return { field, message };
  }
}
