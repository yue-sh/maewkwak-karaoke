# Karaoke

## This monorepo compose of 2 apps

- [Server](./apps/server) public api
- [Client](./apps/client) main web client that used to control karaoke

## Disclaimer

You needed to seed the data first before you can start searching songs, you can seed the data by running the following command

```bash
# put data.json in ./packages/db/prisma/seeds/data

pnpm db:seed
```

for data.json, go find it yourself :D
you can also use the sample data (sample_data.json) and rename it to data.json to test the searching as well

## Usage

```bash
1. Scan wechat qr code in the karaoke
2. make sure you are in the same network with the karaoke
3. open the web client in your browser with the url
ex # http://HOST:PORT/?ip=[WECHAT_IP]&mac=[WECHAT_MAC]&port=[WECHAT_PORT]&mid=[WECHAT_MID]
the url query params are required and you can get from the wechat qr code
```

## Known issue

```bash
As of now macos & ios only works with safari browser because of the CORS problem
```

## Development

```bash
pnpm install

pnpm build:package

# Server only
pnpm dev:server

# Client only
pnpm dev:client
```