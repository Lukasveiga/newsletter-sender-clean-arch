export type Context = {
  username?: string;
  host?: string;
  port?: string;
  token?: string;
};

export interface HtmlCompiler {
  compileHtml(path: string, context: Context): Promise<string>;
}
