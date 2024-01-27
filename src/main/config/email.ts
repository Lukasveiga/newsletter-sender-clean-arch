import { EmailOptions } from "../../usecases/ports/email-service";
import "dotenv/config";

export const getEmailOptions = (): EmailOptions => {
  let emailOptions: EmailOptions;

  if (process.env.NODE_ENV === "prod") {
    emailOptions = {
      host: process.env.EMAIL_HOST as string,
      port: Number.parseInt(process.env.EMAIL_PORT as string),
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASSWORD as string,
    };
  } else {
    emailOptions = {
      host: process.env.EMAIL_HOST_DEV as string,
      port: Number.parseInt(process.env.EMAIL_PORT_DEV as string),
      user: process.env.EMAIL_USER_DEV as string,
      pass: process.env.EMAIL_PASSWORD_DEV as string,
    };
  }

  return emailOptions;
};
