import { Markup } from 'telegraf'
import { addChannel, getChannels } from '../services/db.js'
import { loadPhotoLinks, getRandomLink } from '../utils/index.js'

const links = loadPhotoLinks('./db/photos.json')

export default {
  actions: {
    async exec(ctx) {
      try {
        this[ctx.update.callback_query.data](ctx)
      } catch (error) {
        console.log('[Bot Error]:', error.message)
      }
    },

    async profile(ctx) {
      const channels = await getChannels(ctx.from.id)
      const channelsButtons = channels.map(channel => [Markup.button.callback(`@${channel}`, 'channels')])
    
      await ctx.editMessageText(
        `👋 Hey, ${ctx.from.first_name}\n\nAdd me to your channel as an admin`,
        Markup.inlineKeyboard([
          ...channelsButtons,
          [Markup.button.url('➕ Add bot to channel', `https://t.me/${ctx.botInfo.username}?startchannel`)],
        ])
      )
    },

    async channels(ctx) {
      await ctx.answerCbQuery()
      await ctx.editMessageText(
        'Крутые Девчонки 😎\n\nfor test you can send random photo to your channel',
        Markup.inlineKeyboard([
          [Markup.button.callback('🎲 Random picture', 'randomPhoto')],
          [Markup.button.callback('🗑 Remove', 'removeChannel')],
          [Markup.button.callback('‹ back', 'profile')]
        ])
      )
    },

    async randomPhoto(ctx) {
      const {id, link} = getRandomLink(links)
    
      await ctx.answerCbQuery()
      await ctx.replyWithPhoto(
        {url: link},
        {
          caption: 'Your channel @teen_cutes',
          ...Markup.inlineKeyboard([
            [Markup.button.callback('📤 Отправить', `send_photo_${id}`)],
            [Markup.button.callback('‹ back', 'channels')]
          ])
        }
      )
    },

    async sendPhoto(ctx) {
      const id = ctx.match.input.split('_')[2]
      await ctx.answerCbQuery('😎 Отправлено')
      await ctx.telegram.sendPhoto(CHAT_ID, {url: links[id]})
    }
  },
  events: {
    async myChatMember(ctx) {
      await addChannel(ctx.from.id, ctx.myChatMember.chat.username)
      await ctx.telegram.sendMessage(
        ctx.from.id,
        `🎉 Good, your channel is @${ctx.myChatMember.chat.username}`,
        Markup.inlineKeyboard([
          [Markup.button.callback('✔️ Ok', 'ok')],
        ])
      )
    }
  }
}