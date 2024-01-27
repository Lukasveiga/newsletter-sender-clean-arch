import { getEmailOptions } from "../config/email";

describe("Email Options Environment", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  test("Should return emailOptions with dev env properties", () => {
    process.env = {
      NODE_ENV: "dev",
      EMAIL_HOST_DEV: "dev_host",
      EMAIL_PORT_DEV: "1",
      EMAIL_USER_DEV: "dev_user",
      EMAIL_PASSWORD_DEV: "dev_pass",
    };

    expect(getEmailOptions()).toEqual({
      host: process.env.EMAIL_HOST_DEV,
      port: Number.parseInt(process.env.EMAIL_PORT_DEV as string),
      user: process.env.EMAIL_USER_DEV,
      pass: process.env.EMAIL_PASSWORD_DEV,
    });
  });
});
