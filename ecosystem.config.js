// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

const e = process.env

const env = {
  NODE_ENV: 'production',

  DATABASE_HOST: `${e.NODE_DATABASE_HOST}`,
  DATABASE_PORT: `${e.NODE_DATABASE_PORT}`,
  DATABASE_NAME: `${e.NODE_DATABASE_NAME}`,
  DATABASE_USER: `${e.NODE_DATABASE_USER}`,
  DATABASE_PASSWORD: `${e.NODE_DATABASE_PASSWORD}`,

  SERVER_HOST: `${e.SERVER_HOST}`,
  SERVER_PORT: `${e.SERVER_PORT}`,
  CLIENT_HOST: `${e.CLIENT_HOST}`,
  CLIENT_PORT: `${e.CLIENT_PORT}`,

  TYPESENSE_HOST: `${e.TYPESENSE_HOST}`,
  TYPESENSE_PORT: `${e.TYPESENSE_PORT}`,
  TYPESENSE_API_KEY: `${e.TYPESENSE_API_KEY}`,
  TYPESENSE_PROTOCOL: `${e.TYPESENSE_PROTOCOL}`,
  TYPESENSE_TIMEOUT: `${e.TYPESENSE_TIMEOUT}`,

  DATABASE_URL: `${e.DATABASE_URL}`,
}

const karaoke_front = {
  env,
  name: 'karaoke-front',
  script: './apps/client/dist/server.js',
  instances: 20,
  exec_mode: 'cluster',
  watch: false,
  autorestart: true,
  max_memory_restart: '512M',
}

const karaoke_server = {
  env,
  name: 'karaoke-server',
  script: './apps/server/dist/main.js',
  instances: 5,
  exec_mode: 'cluster',
  watch: false,
  autorestart: true,
  max_memory_restart: '512M',
}


module.exports = {
  apps: [karaoke_front, karaoke_server],
};
