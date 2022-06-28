import { Markup } from 'telegraf'
import * as kb from '../keyboards/index.js'

export const profile = async (ctx, channels, type = 'editMessageText') => {
  await ctx[type](
    `👋 Hey, ${ctx.from.first_name}\n\nManage your channels or\nadd me to your channel as an admin`,
    Markup.inlineKeyboard([
      ...kb.channels(channels),
      [Markup.button.url('➕ Add bot to channel', `https://t.me/${ctx.botInfo.username}?startchannel`)],
    ])
  )
}

export const channel = async (ctx, channelInfo, type = 'editMessageText') => {
  await ctx.answerCbQuery()
  await ctx[type](
    `${channelInfo.title}\ndescription: ${channelInfo.description ?? '➖'}`,
    Markup.inlineKeyboard([
      [
        Markup.button.webApp('📝 Create new post', 'https://tonstake.vercel.app'),
        Markup.button.callback('➕ Add source', 'addSource')
      ],
      [Markup.button.callback('🎲 Random photo', `sendPhoto:${channelInfo.username}`)],
      [Markup.button.callback('🗑 Remove', 'removeChannel')],
      [Markup.button.callback('‹ back', 'profile')]
    ])
  )
}

export const myChatMember = async (ctx) => {
  await ctx.telegram.sendMessage(
    ctx.from.id,
    `🎉 Good, your channel is @${ctx.myChatMember.chat.username}`,
    Markup.inlineKeyboard([
      [Markup.button.callback('✔️ Ok', 'profile')],
    ])
  )
}