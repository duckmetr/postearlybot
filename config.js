import dotenv from 'dotenv'
dotenv.config()

export const {BOT_TOKEN, BOT_WEBHOOK_URL, PORT, MONGODB_URI, CHAT_ID, ENVIRONMENT} = process.env

export const webhookData = ENVIRONMENT === 'prod'
? {webhook: {domain: BOT_WEBHOOK_URL, port: PORT}}
: undefined