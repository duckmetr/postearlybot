import { Markup } from 'telegraf'

export function channels(chls) {
  return chls.map((channel, index) => [Markup.button.callback(`@${channel}`, `channel:${index}:${channel}`)])
}