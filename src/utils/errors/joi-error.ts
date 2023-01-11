import { JoiErrorFieldObject } from "../../common/adapters/joiAdapter"; 

export class JoiValidationError extends Error {
  private details: JoiErrorFieldObject[] = [];

  constructor(details: JoiErrorFieldObject[]) {
    super("Validation error");
    this.message = "Error de validación de campos";
    this.details = details;
  }

  getDetails(): JoiErrorFieldObject[] {
    return this.details;
  }
}
