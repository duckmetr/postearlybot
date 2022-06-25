import { Telegraf } from 'telegraf'
import BotController from './controllers/BotController.js'
import { checkAvailability } from './middlewares/checks.js'
import { createUser } from './services/db.js'
import * as views from './views/index.js'
import { BOT_TOKEN, webhookData } from'./config.js'
import './db/connect.js'

const bot = new Telegraf(BOT_TOKEN)

bot.use(checkAvailability)
bot.start(async ctx => {
  await createUser(ctx.from)
  views.profile(ctx)
})
bot.on('callback_query', async ctx => await BotController.actions.exec(ctx))
bot.on('my_chat_member', async ctx => await BotController.events.myChatMember(ctx))
bot.catch(error => console.log(error))

await bot.launch(webhookData)
console.log('bot started..')