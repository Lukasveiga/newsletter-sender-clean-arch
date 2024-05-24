export interface TokenOptions {
  readonly secretKey: string;
  readonly expiresIn: string;
  readonly algorithm: string;
  readonly iss: string;
  readonly iat: number;
}

export interface Token {
  generate(email: string, tokenOptions: TokenOptions): string;
  validate(token: string, secretKey: string): any;
}
