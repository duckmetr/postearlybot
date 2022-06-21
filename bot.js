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
    ...Markup.keyboard(['👻 Рандомное фото']).resize()
  })
})

bot.hears('👻 Рандомное фото', async ctx => {
  const randomId = Math.floor(Math.random() * photos.length)
  const randomPhoto = photos[randomId]

  await ctx.replyWithPhoto(
    {url: randomPhoto},
    {
      caption: 'Your channel @teen_cutes',
      ...Markup.inlineKeyboard([
        Markup.button.callback('📤 Отправить', `send_photo_${randomId}`)
      ])
    })
})

bot.action(/send_photo_/, async ctx => {
  const id = ctx.match.input.split('_')[2]
  await ctx.answerCbQuery('😎 Отправлено')
  await ctx.telegram.sendPhoto(CHAT_ID, {url: photos[id]})
})

ENVIRONMENT === 'prod'
? await bot.launch({webhook: {domain: BOT_WEBHOOK_URL, port: PORT}})
: await bot.launch()
console.log('bot started..')