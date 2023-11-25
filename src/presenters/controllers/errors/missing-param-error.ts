import { ControllerError } from "./controller-error";

export class MissingParamError extends ControllerError {
  constructor(param: string) {
    super(`${param} is required`);
    this.name = "MissingParamError";
  }
}
