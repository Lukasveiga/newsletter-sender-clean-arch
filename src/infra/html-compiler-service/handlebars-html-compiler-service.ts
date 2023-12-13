import { Context, HtmlCompiler } from "../../usecases/ports/html-compiler";
import handlebars from "handlebars";
import fs from "fs/promises";
import { HtmlCompilerError } from "../../usecases/errors/html-compiler-error";

export class HandlebarsHtmlCompilerService implements HtmlCompiler {
  async compileHtml(path: string, context: Context): Promise<string> {
    try {
      const html = await fs.readFile(path);
      const compiler = handlebars.compile(html.toString());
      const htmlString = compiler(context);
      return htmlString;
    } catch (error) {
      throw new HtmlCompilerError();
    }
  }
}
