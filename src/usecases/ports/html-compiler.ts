export type Context = {
  username?: string;
};

export interface HtmlCompiler {
  compile(path: string, context: Context): Promise<string>;
}
