export type Context = {
  username?: string;
};

export interface HtmlCompiler {
  compileHtml(path: string, context: Context): Promise<string>;
}
