import { Telegraf } from 'telegraf'
import schedule from 'node-schedule'
import { photos } from './photos.js'
import dotenv from 'dotenv'
dotenv.config()

const {BOT_TOKEN, CHAT_ID} = process.env
const bot = new Telegraf(BOT_TOKEN)

schedule.scheduleJob('* */3 * * *', function() {
  bot.telegram.sendPhoto(CHAT_ID, {url: photos[Math.floor(Math.random() * photos.length)]})
})