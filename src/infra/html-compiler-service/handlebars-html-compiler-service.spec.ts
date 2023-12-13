import { HtmlCompilerError } from "../../usecases/errors/html-compiler-error";
import { Context } from "../../usecases/ports/html-compiler";
import { HandlebarsHtmlCompilerService } from "./handlebars-html-compiler-service";
import fs from "fs/promises";
import handlebars from "handlebars";

const sut = new HandlebarsHtmlCompilerService();

const path = "/html-test.html";
const context: Context = { username: "username_test" };

jest.mock("fs/promises");
jest.mock("handlebars");

describe("HandlebarsHtmlCompilerService", () => {
  test("Should throw if handlebars throws", async () => {
    handlebars.compile = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const promise = sut.compileHtml(path, context);
    expect(promise).rejects.toThrow(new HtmlCompilerError());
  });

  test("Should return compiled html", async () => {
    fs.readFile = jest.fn().mockResolvedValue(Buffer.from(""));

    handlebars.compile = jest.fn().mockReturnValue((context: Context) => {
      return `<h1>${context.username}</h1>`;
    });

    const result = await sut.compileHtml(path, context);
    expect(result).toEqual("<h1>username_test</h1>");
  });
});
