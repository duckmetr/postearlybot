import { Telegraf } from 'telegraf'
import BotController from './controllers/BotController.js'
import { checkAvailability } from './middlewares/checks.js'
import { BOT_TOKEN, webhookData } from'./config.js'
import './db/connect.js'

const bot = new Telegraf(BOT_TOKEN)

bot.use(checkAvailability)
bot.start(BotController.start)
bot.on('callback_query', ctx => BotController.action(ctx))
bot.on('my_chat_member', ctx => BotController.events.myChatMember(ctx))
bot.catch(error => console.log(error))

await bot.launch(webhookData)
console.log('bot started..')