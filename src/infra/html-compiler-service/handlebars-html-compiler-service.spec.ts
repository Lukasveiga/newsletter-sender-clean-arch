import { HtmlCompilerError } from "../../usecases/errors/html-compiler-error";
import { Context } from "../../usecases/ports/html-compiler";
import { HandlebarsHtmlCompilerService } from "./handlebars-html-compiler-service";

const sut = new HandlebarsHtmlCompilerService();

const path = "./test_path";
const context: Context = { username: "username_test" };

const readFileMock = jest.fn().mockReturnValue("");
jest.mock("fs", () => ({
  readFile: readFileMock,
}));

describe("HandlebarsHtmlCompilerService", () => {
  test("Should throw if handlebars throws", async () => {
    jest.mock("handlebars", () => ({
      compile: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
    }));

    const promise = sut.compile(path, context);
    expect(promise).rejects.toThrow(new HtmlCompilerError());
  });
});
