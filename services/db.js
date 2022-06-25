import User from '../models/users.js'

export async function createUser(tg_info) {
  try {
    const user = await User.findOne({id: tg_info.id})
    if (!user) {
      console.log('user created')
      return await User.create({...tg_info})
    }
  } catch (error) {
    console.log(`[MONGOOSE]: ${error.message}`)
  }
}

export async function getChannels(id) {
  try {
    const user = await User.findOne({id})
   
    return user.channels
  } catch (error) {
    console.log(`[MONGOOSE]: ${error.message}`)
  }
}

export async function addChannel(id, username) {
  try {
    await User.findOneAndUpdate({id}, {$addToSet: {channels: username}})
  } catch (error) {
    console.log(`[MONGOOSE]: ${error.message}`)
  }
}