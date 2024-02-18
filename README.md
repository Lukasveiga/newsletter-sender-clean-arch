## ✉️ NewsLetter sender + TypeScript + Clean Architecture

<p align="center">
     <a alt="Node">
        <img src="https://img.shields.io/badge/Nodejs-v18.16.0-blue.svg" />
    </a>
    <a alt="Typescript">
        <img src="https://img.shields.io/badge/Typescript-v5.2.2-purple.svg" />
    </a>
    <a alt="Jest">
        <img src="https://img.shields.io/badge/Jest-v29.7.0-brightgreen.svg" />
    </a>
    <a alt="Express">
        <img src="https://img.shields.io/badge/Express-v4.18.2-lightgreen.svg" />
    </a>
    <a alt="MongoDB">
        <img src="https://img.shields.io/badge/MongoDB-v6.3.0-darkblue.svg" />
    </a>
    <a alt="nodemailer">
        <img src="https://img.shields.io/badge/Nodemailer-v6.9.7-red.svg">
    </a>
</p>

### Overview:

<p align="justify">Email delivery project containing the content of a newsletter, developed using Node.js and Typescript. The entire project adheres to the Clean Architecture designed by Robert C. Martin.</p>

_What are the advantages of building a project following this architecture?_

<p align="justify">The primary objective of Clean Architecture is the separation of concerns, achieved by dividing the software into distinct layers. Each layer includes at least one for business rules and another for interfaces. This approach results in a system that is:</p>

<ul>
  <li>Independent of Frameworks</li>
  <li>Testable</li>
  <li>Independent of UI</li>
  <li>Independent of Database</li>
  <li>Independent of any external agency</li>
</ul>

<br>

<div align="center">
<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" width="500"/>
<p><i>Reference: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html</i></p>
</div>

<br>

<hr>

### Code Architecture:

<ul>
  <li>Entities Layer:
    <ul>
      <li>User Entity</li>
    </ul>
  </li>
  <li>Usecases Layer:
    <ul>
      <li>Subscribe user on newsletter</li>
      <li>Send newsletter to subscribed users</li>
      <li>Unsubscribe user of newsletter</li>
      <li>In memory user repository</li>
    </ul>
  </li>
  <li>Presenters Layer:
    <ul>
      <li>Subscribe user controller</li>
      <li>Send newsletter controller</li>
      <li>Unsubscribe user controller</li>
    </ul>
  </li>
  <li>Infra Layer:
    <ul>
      <li>Email Service (nodemailer)</li>
      <li>Html Compiler Service (handlebars)</li>
      <li>Repository (mongodb)</li>
    </ul>
  </li>
  <li>Main Layer:
    <ul>
      <li>Express configuration</li>
      <li>Factory</li>
      <li>Middlewares</li>
      <li>Routes</li>
    </ul>
  </li>
</ul>

<hr>

### Test Coverage:

<div align="center">
<img src="https://raw.githubusercontent.com/Lukasveiga/newsletter-sender-clean-arch/main/assets/coverage.png" width="500"/>
</div>

<hr>

### Containerizing the application:

<hr>

### Next features to be implemented:

- Unsubscribe link into de the email;
- Add a weekly email schedule (example: node-cron)

<hr>

### Contact Information:

- Questions and feedbacks are very welcome.

- Email: lukas.veiga10@gmail.com
