import { Telegraf, Markup } from 'telegraf'
import { photos } from './photos.js'
import dotenv from 'dotenv'
dotenv.config()

const {BOT_TOKEN, BOT_WEBHOOK_URL, PORT, CHAT_ID, ENVIRONMENT} = process.env
const bot = new Telegraf(BOT_TOKEN)

bot.use(async (ctx, next) => {
  if (ctx.from.id !== 541625404) {
    await ctx.reply('в разработке')
    return
  }
  next()
})

bot.start(async ctx => {
  await ctx.replyWithSticker('CAACAgIAAxkBAAEFDvxiq4ISqvz7RrZc-tNYUE2SgdoxagACkRIAArkkAAFK_xyu2zmHzvMkBA', {
    ...Markup.keyboard(['👻 Отправить фото']).resize()
  })
})

bot.hears('👻 Отправить фото', async ctx => {
  const randomPhoto = photos[Math.floor(Math.random() * photos.length)]
  await ctx.telegram.sendPhoto(CHAT_ID, {url: randomPhoto})
  await ctx.replyWithPhoto({url: randomPhoto}, {caption: 'This photo send to @teen_cutes'})
})

bot.hears('test', async ctx => {
  await ctx.reply('test web btn', Markup.inlineKeyboard([
    Markup.button.webApp('open', 'https://1gram.ru')
  ]))
})

ENVIRONMENT === 'prod'
? await bot.launch({webhook: {domain: BOT_WEBHOOK_URL, port: PORT}})
: await bot.launch()
console.log('bot started..')