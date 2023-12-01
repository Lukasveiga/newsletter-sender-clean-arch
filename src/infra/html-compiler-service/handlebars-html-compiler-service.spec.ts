import { HtmlCompilerError } from "../../usecases/errors/html-compiler-error";
import { Context } from "../../usecases/ports/html-compiler";
import { HandlebarsHtmlCompilerService } from "./handlebars-html-compiler-service";

const sut = new HandlebarsHtmlCompilerService();

const path = "./test_path";
const context: Context = {};

const compilerMock = jest.fn().mockReturnValue("compiler");
jest.mock("handlebars", () => ({
  compile: jest.fn().mockImplementation(() => ({
    compiler: compilerMock,
  })),
}));

const handlebars = require("handlebars");

beforeEach(() => {
  compilerMock.mockClear();
  handlebars.compile.mockClear();
});

describe("HandlebarsHtmlCompilerService", () => {
  test("Should throw if handlebars throws", async () => {
    compilerMock.mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.compile(path, context);
    expect(promise).rejects.toThrow(new HtmlCompilerError());
  });
});
