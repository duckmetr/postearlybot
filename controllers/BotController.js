import * as db from '../services/db.js'
import * as views from '../views/index.js'
import { loadPhotoLinks, getRandomLink } from '../utils/index.js'

const links = loadPhotoLinks('./db/photos.json')

export default {
  async start(ctx) {
    await db.createUser(ctx.from)
    const channels = await db.getChannels(ctx.from.id)
    await views.profile(ctx, channels, 'reply')
  },
 
  async action(ctx) {
    try {
      const [method, ...args] = ctx.update.callback_query.data.split(':')
      await this.actions[method](ctx, args)
    } catch (error) {
      console.log('[Bot Error]:', error.message)
    }
  },

  actions: {
    async profile(ctx) {
      const channels = await db.getChannels(ctx.from.id)
      await views.profile(ctx, channels)
    },

    async channel(ctx, [, username]) {
      const channelInfo = await ctx.telegram.getChat(`@${username}`)
      await views.channel(ctx, channelInfo)
    },

    async sendPhoto(ctx, [username]) {
      const {link} = getRandomLink(links)
      await ctx.answerCbQuery('😎 Отправлено')
      await ctx.telegram.sendPhoto(`@${username}`, {url: link})
    }
  },

  events: {
    async myChatMember(ctx) {
      await db.addChannel(ctx.from.id, ctx.myChatMember.chat.username)
      await views.myChatMember(ctx)
    }
  }
}