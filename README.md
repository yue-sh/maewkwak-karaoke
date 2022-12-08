<p align=center>
  <img width=580 src=https://user-images.githubusercontent.com/61514399/206395498-0abada27-2321-4d05-a829-e9bc1dd1658d.png alt='MeawKwak label' />
</p>

## Public endpoint

```bash

# Client

https://fallback.chiffon.day # client just for just searching songs

http://karaoke.chiffon.day # main client

# Server

REST

GET https://api.chiffon.day/api/v1/song/search?q=[QUERY]
GET https://api.chiffon.day/api/v1/song/search/fallback?q=[QUERY]

GraphQL

MAIN https://api.chiffon.day/api/v1/song/graphql
GraphiQL https://api.chiffon.day/graphiql
```

query can be artist name, song name, romanji for both song name & artist

normal search use typesense for searching, fallback search use postgres for searching


## Client Usage

```bash
1. Scan wechat qr code in the karaoke

2. make sure you are in the same network with the karaoke

3. open the web client in your browser with the url

ex # http://karaoke.chiffon.day/?ip=[WECHAT_IP]&mac=[WECHAT_MAC]&port=[WECHAT_PORT]&mid=[WECHAT_MID]

the url query params are required and you can get from the wechat qr code
```

## Known issue

```bash
As of now macos & ios only works with safari browser because of the CORS problem

For windows, we still also got the CORS problem. You can try to use non chromium browser such as firefox but we're unsure if it's gonna work
```

## Disclaimer

You needed to seed the data first before you can start searching songs, you can seed the data by running the following command

```bash
# put data.json in ./packages/db/prisma/seeds/data

pnpm db:seed
```

for data.json, go find it yourself :D

you can also use the sample data (sample_data.json) and rename it to data.json to test the searching as well

## Development

```bash
pnpm install

pnpm build:package

# Server only
pnpm dev:server

# Client only
pnpm dev:client
```
