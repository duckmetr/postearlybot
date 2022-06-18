import { Telegraf } from 'telegraf'
import cron from 'node-cron'
import { photos } from './photos.js'
import dotenv from 'dotenv'
dotenv.config()

const {BOT_TOKEN, CHAT_ID} = process.env
const bot = new Telegraf(BOT_TOKEN)

cron.schedule('* */6 * * *', () => {
  bot.telegram.sendPhoto(CHAT_ID, {url: photos[Math.floor(Math.random() * photos.length)]})
})