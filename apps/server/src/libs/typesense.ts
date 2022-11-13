import Typesense from 'typesense'
import {
  TYPESENSE_HOST,
  TYPESENSE_PORT,
  TYPESENSE_API_KEY,
  TYPESENSE_PROTOCOL,
  TYPESENSE_TIMEOUT
} from '@karaoke/core'

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_HOST,
      port: +TYPESENSE_PORT,
      protocol: TYPESENSE_PROTOCOL
    }
  ],
  apiKey: TYPESENSE_API_KEY,
  connectionTimeoutSeconds: +TYPESENSE_TIMEOUT
})
