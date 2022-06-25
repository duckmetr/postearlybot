export async function checkAvailability(ctx, next) {
  if (ctx.from?.id !== 541625404) {
    await ctx.reply('в разработке')
    return
  }
  next()
}