# nest boilerplate

- NestJS
- GraphQL
- MikroORM
- Postgres
- JWT Auth

## Env file

Duplicate `.env.sample` to `.env` file
En populate it with correct data.
`postgresql://{username}:{password}@localhost:5433/{database_name}`  
The correct information can be found in the `docker-compose.yaml` file

## launch project

to start the database : `docker-compose up -d`
On the first setup you need to execute de sql file in the `./postgres/init.sql`
It will setup postgres for UUID

After that you can create the database : `npm run schema:create`
Start the API : `npm run start:dev`
And seed if you want to : `npm run seed`

## update database

to update db schema you need to launch `npm run schema:update`
