import { Telegraf } from 'telegraf'
import dotenv from 'dotenv'
dotenv.config()

const {BOT_TOKEN, BOT_WEBHOOK_URL, PORT, ENVIRONMENT} = process.env
const bot = new Telegraf(BOT_TOKEN)

bot.start(ctx => ctx.reply('it work'))

ENVIRONMENT === 'prod'
? await bot.launch({webhook: BOT_WEBHOOK_URL, port: PORT})
: await bot.launch()
console.log('bot started..')