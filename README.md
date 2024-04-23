# Query Browser - PostgreSQL + Nest.js + React.js

This project, titled "Query Browser," is a web application built using a combination of powerful technologies including PostgreSQL, Nest.js, TypeORM, React.js, SWC, TypeScript, Vite, and Tailwind CSS. It aims to provide a user-friendly interface for querying databases efficiently.

<!-- TABLE OF CONTENTS -->

  <!-- markdownlint-disable MD033 -->
  <details>
    <summary>Table of Contents</summary>
    <ol>
      <li>
        <a href="#reactjs-client">React.js Client</a>
        <ul>
          <li><a href="#create-reactjs-app">Create React.js App</a></li>
          <li><a href="#install-tailwind-css--automatic-class-sorting-with-prettier">Install Tailwind CSS + Automatic Class Sorting with Prettier</a></li>
          <li><a href="#tailwind-css-configuration">Tailwind CSS Configuration</a></li>
          <li><a href="#prettier-configuration">Prettier Configuration</a></li>
          <li><a href="#add-the-tailwind-directives-to-css">Add the Tailwind directives to CSS</a></li>
          <li><a href="#start-build-process">Start build process</a></li>
        </ul>
      </li>
      <li>
        <a href="#run-reactjs-client">Run React.js Client</a>
      </li>
      <li>
        <a href="#nestjs-server">Nest.js Server</a>
        <ul>
          <li><a href="#create-nestjs-app">Create Nest.js App</a></li>
          <li><a href="#install-the-required-packages">Install the required packages</a></li>
          <li><a href="#test-the-api">Test the API</a></li>
        </ul>
      </li>
      <li>
        <a href="#run-nestjs-server">Run Nest.js Server</a>
      </li>
    </ol>
  </details>
  <!-- markdownlint-enable MD033 -->

<!-- INSTALLATION AND SETUP INSTRUCTIONS -->

## React.js Client

### Create React.js App

Start by creating a new React.js App using Vite project if you don’t have one set up already. The most common approach is to use [Create Vite](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

```bash
npm create vite@latest reactjs-client -- --template react-swc-ts
cd reactjs-client
```

### Install Tailwind CSS + Automatic Class Sorting with Prettier

Install `tailwindcss`, `prettier-plugin-tailwindcss` and its peer dependencies, then generate your `tailwind.config.js`, `postcss.config.js`, `.prettierrc` files.

```bash
npm install -D tailwindcss postcss autoprefixer prettier prettier-plugin-tailwindcss
npx tailwindcss init -p
```

### Tailwind CSS Configuration

Add the paths to all of your template files in your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Prettier Configuration

Add the plugin to your `.prettierrc` file.

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Add the Tailwind directives to CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Start build process

Run your build process with `npm run dev`.

```bash
npm run dev
```

## Run React.js Client

- Step 1: Create a `.env` file at root directory of client **(reactjs-client)** with below variables.

```env
REACT_APP_API_BASE=http://127.0.0.1:3200
```

- Step 2: Install your React.js App with `npm install`.

```bash
npm install
```

- Step 3: Run your React.js App with `npm run dev`.

```bash
npm run dev
```

## Nest.js Server

### Create Nest.js App

Create a new Nest.js App project with the help of the command. To create a new project, you can use the below command.

```bash
nest new nestjs-server
cd nestjs-server
```

### Install the required packages

Need the help of some packages you can install via npm. open the terminal and use the below commands.

```bash
npm install -D @nestjs/config @nestjs/typeorm typeorm @types/pg pg
```

### Connect the database

Add the typeORM module in `app.module.ts` and Add inject repository in `connection.module.ts`.

here is the code snippet of `app.module.ts`.

```ts
import { Module } from "@nestjs/common";
import { ConnectionModule } from "./connection/connection.module";

@Module({
  imports: [ConnectionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

here is the code snippet of `connection.module.ts`.

```ts
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionController } from "./connection.controller";
import { ConnectionService } from "./connection.service";
import { ConnectionConfig } from "./connection.config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("POSTGRES_HOST"),
        port: configService.get<number>("POSTGRES_PORT"),
        username: configService.get<string>("POSTGRES_USERNAME"),
        password: configService.get<string>("POSTGRES_PASSWORD"),
        database: configService.get<string>("POSTGRES_DATABASE"),
        entities: [ConnectionConfig],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([ConnectionConfig]),
  ],
  controllers: [ConnectionController],
  providers: [ConnectionService],
})
export class ConnectionModule {}
```

### Test the API

Start the NestJS application by running the following command:

```bash
npm run start:dev
```

## Run Nest.js Server

- Step 1: Create a Postgre database at pgAdmin 4 with PostgreSQL
- Step 2: Create a .env file at root directory of server (nestjs-server) with below variables. (Please change database configurations)

```env
POSTGRES_HOST=xxxxxx
POSTGRES_PORT=xxxxxx
POSTGRES_USERNAME=xxxxxx
POSTGRES_PASSWORD=xxxxxx
POSTGRES_DATABASE=xxxxxx
PORT=3200
```

- Step 3: Install your Nest.js App with `npm install`.

```bash
npm install
```

- Step 4: Run your Nest.js App with `npm start`.

```bash
npm start
```
