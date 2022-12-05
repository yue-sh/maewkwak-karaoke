import 'dotenv/config'

const e = process.env

export const isDevelopment = e.NODE_ENV === 'development'

export const SERVER_HOST = e.SERVER_HOST
export const SERVER_PORT = e.SERVER_PORT
export const CLIENT_HOST = e.CLIENT_HOST
export const CLIENT_PORT = e.CLIENT_PORT

export const DATABASE_URL = e.DATABASE_URL

export const TYPESENSE_HOST = e.TYPESENSE_HOST
export const TYPESENSE_PORT = e.TYPESENSE_PORT
export const TYPESENSE_PROTOCOL = e.TYPESENSE_PROTOCOL
export const TYPESENSE_API_KEY = e.TYPESENSE_API_KEY
export const TYPESENSE_TIMEOUT = e.TYPESENSE_TIMEOUT
