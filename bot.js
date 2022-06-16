import { Telegraf, Markup } from 'telegraf'
import { photos } from './photos.js'
import dotenv from 'dotenv'
dotenv.config()

const {BOT_TOKEN, BOT_WEBHOOK_URL, PORT, CHAT_ID, ENVIRONMENT} = process.env
const bot = new Telegraf(BOT_TOKEN)

bot.start(async ctx => {
  await ctx.replyWithSticker('CAACAgIAAxkBAAEFtANgylYa9TW-IvhYc8-_bDnCUYmjxwACfwADhZySHrdG2Mf8xmlJHwQ', {
    ...Markup.keyboard(['👻 Получить мем']).resize()
  })
})

bot.hears('👻 Получить мем', async ctx => {
  await ctx.telegram.sendPhoto(CHAT_ID, {url: photos[Math.floor(Math.random() * photos.length)]})
})

ENVIRONMENT === 'prod'
? await bot.launch({webhook: {domain: BOT_WEBHOOK_URL, port: PORT}})
: await bot.launch()
console.log('bot started..')