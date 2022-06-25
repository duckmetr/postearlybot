import { Markup } from 'telegraf'
import { getChannels } from '../services/db.js'

export const profile = async ctx => {
  const channels = await getChannels(ctx.from.id)
  const channelsButtons = channels.map(channel => [Markup.button.callback(`@${channel}`, 'channels')])

  await ctx.reply(
    `👋 Hey, ${ctx.from.first_name}\n\nAdd me to your channel as an admin`,
    Markup.inlineKeyboard([
      ...channelsButtons,
      [Markup.button.url('➕ Add bot to channel', 'https://t.me/postearlybot?startchannel')],
    ])
  )
}