# test-example-app

## Setup

### Prerequisites

#### Node and NPM via NVM

**Install NVM:**

Follow the instructions [here](https://github.com/nvm-sh/nvm#installing-and-updating).

**Install the version of node specified in the `.nvmrc` file and switch to it:**

```bash
nvm install
nvm use
```

**(Optional) Set the node version as default:**

```bash
nvm alias default $(cat .nvmrc)
```

**(Optional) Automatically switch Node version when changing directories:**

Follow the instructions for your shell [here](https://github.com/nvm-sh/nvm#deeper-shell-integration).

#### Pip3

Follow the instructions [here](https://pip.pypa.io/en/stable/installation/).

#### Docker

Follow the instructions [here](https://docs.docker.com/engine/install/).

**Post installation steps for Linux users:**

Follow the instructions [here](https://docs.docker.com/engine/install/linux-postinstall/).

**Docker Compose:**

In case `docker compose` isn't setup with the docker intallation follow the instructions [here](https://docs.docker.com/compose/install/).

### Clone the repo and cd into the folder

```bash
git clone git@github.com:<your-project>.git
cd <your-project>
```

### Install Node modules

```bash
npm install
```

### Setup environment variables

Copy the `.env.example` file to `.env`. Update environment variables as needed.

```bash
cp .env.example .env
```

### Setup environment variables for e2e tests

Copy the `.env` file to `.env.test`. Update environment variables as needed.

```bash
cp .env .env.test
```

Update `NODE_ENV` to `test`.

Make sure to provide a different `PGDATABASE` from what you have in `.env`
as e2e tests wipe the database clean before they run.

You may want to disable query logging by removing `DEBUG=knex:query`.

### Setup docker-compose overrides

Create a `docker-compose.override.yml` file using the example:

```bash
cp docker-compose.override.example.yml docker-compose.override.yml
```

You can open the `docker-compose.override.yml` and addjust the port Swagger UI is being served on (default is 3001).

If you're on Apple M1, uncomment the `platform: linux/amd64` line:

```yaml
swaggerui:
  # uncomment the line below for Apple M1
  platform: linux/amd64
  ports:
    - '3001:8080'
```

### Provision the services

In order to provision the database run:

```bash
docker-compose up -d
```

If you want to provision Swagger UI as well, then use the `tools` profile:

```bash
docker-compose --profile tools up -d
```

To learn more about using profiles, checkout the [documentation](https://docs.docker.com/compose/profiles/).

### Run database migrations

```bash
npm run db:migrate:latest
```

## Running the app

```bash
# build the app
npm run build
# run in development mode
npm run start

# run in watch mode
npm run start:dev

# run in debug mode
npm run start:debug
```

## Test

**Unit Tests**

```bash
# run
npm run test

# watch
npm run test:watch

# coverage
npm run test:cov
```

**End-to-end Tests**

```bash
# e2e tests
npm run test:e2e

# e2e coverage
npm run test:e2e:cov
```

## Working with migrations

The underlying library is `knex`. You can find their guide on migraions [here](http://knexjs.org/guide/migrations.html).

```bash
# check what is the last applied migration
npm run db:migrate:version

# check which migrations have been run and how many are pending
npm run db:migrate:status

# create a new migration file
npm run db:migrate:make <migration-name>

# run the next migration that has not yet been run
npm run db:migrate:up

# undo the last migration that was run
npm run db:migrate:down

# run all pending migrations
npm run db:migrate:latest

# rollback the last batch of migrations
npm run db:migrate:rollback

# rollback all migrations
npm run db:migrate:rollback --all

# rollback all migrations and re-apply latest
npm run db:migrate:reset
```

To debug migrations set the `DEBUG` environment variable to `knex:query`, e.g.

```bash
DEBUG=knex:query npm run db:migrate:up
```

## Working with Docker

```bash
# build the image
npm run image:build

# run the image
npm run image:run
```

## Working with OpenAPI

In order to generate the OpenAPI document run:

```bash
npm run openapi:g
```

Then, if you haven't already, start the Swagger UI service:

```
docker compose --profile tools up -d
```

Otherwise, restart the services:

```
docker compose --profile tools restart
```

You only need to do this once, if you ran `docker-compose` before `npm run openapi:g`.

Now navigate to `http://localhost:3001` and you should be able to see the `To-Do` API documentation.

If you're experiencing issues setting this up, checkout the troubleshooting section at the bottom.

## Debug

**VS Code**

Go to the Debug menu (CTRL+SHIFT+D). From `RUN AND DEBUG` at the top select `Run Script: Launch via NPM`.
You should now be able to start debugging by pressing `F5`.

## Troubleshooting

**OpenAPI**

If `docker-compose` fails with this message and you're on Apple M1:

```bash
The requested image's platform (linux/amd64) does not match the detected host platform (linux/arm64/v8) and no specific platform was requested
```

then uncomment the `platform: linux/amd64` line in `docker-compose.override.yml`

```yaml
swaggerui:
  # uncomment the line below for Apple M1
  platform: linux/amd64
  ports:
    - '3001:8080'
```

If you're seeing `This site can't be reached` after navigating to `http://localhost:3001`,
then it means that the `swaggerui` service is not running. Try provisioning it:

```bash
docker compose --profile tools up -d
```

In case you're seeing the `Swagger Petstore` documentation

```bash
# generate the OpenApi document
npm run openapi:g

# restart the services
docker compose --profile tools restart
```

If Swagger UI is running successfully, but all requests you make through it are failing,
then you probably forgot to start the application:

```bash
npm run start:dev
```
