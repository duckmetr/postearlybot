import fs from 'fs'

export async function isAdmin(ctx, channelId) {
  const admins = await ctx.telegram.getChatAdministrators(channelId)
  return admins.some(admin => admin.user.username === ctx.botInfo.username)
}

export async function updateMessage(ctx, type) {
  try {
    // console.log(ctx)

    switch (type) {
      case 'text':
        // console.log('it\'s text')
        break;
      case 'photo':
        // console.log('it\'s photo')
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error)
  }
}

export function loadPhotoLinks(path) {
  const links = JSON.parse(fs.readFileSync(path))
  
  return links.photos
}

export function getRandomLink(links) {
  const randomInt = Math.floor(Math.random() * links.length)

  return {id: randomInt, link: links[randomInt]}
}