## NewsLetter sender + TypeScript + Clean Architecture

- Enviar email com a newsletter para usuários cadastrados;

- Entidades:
  - usuários;
- Casos de uso:
  - cadastrar usuário;
  - desativar usuário;
  - enviar email para usuários cadastrados/ativos;
- infra:

  - nodemailer;
  - mongodb;
  - express/nest.js

- Next features to be implemented:
  - Unsubscribe link into de the email;
  - Add a weekly email schedule (example: node-cron)
