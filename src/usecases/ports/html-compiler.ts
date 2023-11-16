export type Context = {
  title: string;
  username: string;
  text: string;
};

export interface HtmlCompiler {
  compile(path: string, context: Context): Promise<string>;
}
