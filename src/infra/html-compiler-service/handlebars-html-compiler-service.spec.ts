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
});
