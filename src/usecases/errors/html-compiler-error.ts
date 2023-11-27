import { UsecaseError } from "./usecase-error";

export class HtmlCompilerError extends UsecaseError {
  constructor() {
    super("Html Compiler Service Error");
    this.name = "HtmlCompilerError";
  }
}
