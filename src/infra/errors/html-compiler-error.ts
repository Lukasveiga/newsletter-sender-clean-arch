import { InfraError } from "./infra-error";

export class HtmlCompilerError extends InfraError {
  constructor() {
    super("Html Compiler Service Error");
    this.name = "HtmlCompilerError";
  }
}
