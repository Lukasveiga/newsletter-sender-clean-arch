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

<p align="justify">
To build the project image, a dockerfile with the multisage concept was used. Multistage builds make use of one Dockerfile with multiple FROM instructions. Each of these FROM instructions is a new build stage that can COPY artifacts from the previous stages.
<br><br>
There are two main reasons for why you’d want to use multi-stage builds:
</p>

<ul>
  <li>They allow you to run build steps in parallel, making your build pipeline faster and more efficient.</li>
  <li>They allow you to create a final image with a smaller footprint, containing only what's needed to run your program.</li>
</ul>

#### - Let's break down each line of the Dockerfile:

```Dockerfile
FROM node:18-bullseye-slim AS builder
```

<p align="justify">
Here we are using the official Node.js 18 image with slim version as the base image.
<br>
<b>AS builder</b>: Assigns a name to the build stage. This allows using multiple stages in a single Dockerfile.
</p>

```Dockerfile
WORKDIR /usr/src/app
```

<p align="justify">
Set the working directory inside the container.
</p>

```Dockerfile
COPY --chown=node:node package*.json ./
```

<p align="justify">
Copy package.json and package-lock.json to the working directory.
<br>
<b>--chown=node:node</b>: Sets ownership of the copied files to the specified user and group. This is a security best practice to avoid running processes as root.
</p>

```Dockerfile
COPY . .
```

<p align="justify">
Copy all files from the host to the container's working directory.
</p>

```Dockerfile
RUN npm run build
```

<p align="justify">
Runs the build script defined in the package.json. This likely compiles/transpiles the source code into a distributable form.
</p>

#### Second stage:

```Dockerfile
FROM node:18-bullseye-slim
```

<p align="justify">
Starts a new build stage using the same base image.
</p>

```Dockerfile
ENV NODE_ENV dev
```

<p align="justify">
Sets the environment variable NODE_ENV to 'dev'. This can be overridden during container runtime if needed.
</p>

```Dockerfile
USER node
```

<p align="justify">
Switches to a non-root user. This is a security best practice to minimize the impact of security vulnerabilities.
</p>

```Dockerfile
WORKDIR /usr/src/app
```

<p align="justify">
Sets the working directory for subsequent instructions in this stage.
</p>

```Dockerfile
COPY package*.json ./
```

<p align="justify">
Copies package.json and package-lock.json from the host to the container.
</p>

```Dockerfile
COPY .env ./
```

<p align="justify">
Copies .env file from the host to the container.
</p>

```Dockerfile
RUN npm ci --production
```

<p align="justify">
Installs only production dependencies, skipping development dependencies.
</p>

```Dockerfile
COPY --from=builder /usr/src/app/dist ./dist
```

<p align="justify">
Copies the compiled/transpiled application from the previous build stage into the current stage.
</p>

```Dockerfile
EXPOSE 3030
```

<p align="justify">
Exposes port 3030 for incoming connections. Note that this doesn't actually publish the port; it's just a documentation of intended port usage.
</p>

```Dockerfile
CMD ["node", "dist/main/server.js"]
```

<p align="justify">
Specifies the default command to run when the container starts. In this case, it runs the Node.js application server from the compiled output.
</p>

<hr>

### Build image and run docker container:

- Build docker image:

```console
docker build -t devlukas/newsletter-sender:1.0 .
```

- Run docker container:

```console
docker run -p 3030:3030 devlukas/newsletter-sender:1.0
```

<hr>

### Next features to be implemented:

- <s>Unsubscribe link into de the email</s>;
- Add a weekly email schedule (example: node-cron)

<hr>

### Contact Information:

- Questions and feedbacks are very welcome.

- Email: lukas.veiga10@gmail.com
