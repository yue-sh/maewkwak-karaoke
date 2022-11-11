import 'dotenv/config'

const e = process.env

export const isDevelopment = e.NODE_ENV === 'development'

export const SERVER_HOST = e.SERVER_HOST
export const SERVER_PORT = e.SERVER_PORT
export const CLIENT_HOST = e.CLIENT_HOST
export const CLIENT_PORT = e.CLIENT_PORT

export const DATABASE_URL = e.DATABASe_URL
