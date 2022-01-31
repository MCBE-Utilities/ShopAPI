import { Player } from 'beapi-core'
import { itemCollection } from '../database/index.js'
import { category } from './index.js'

export function buyItem(player: Player, itemId: string): void {
  const item = itemCollection.get(itemId)
  const form = player.createModalForm()
  form.title = `Buying x1 ${item.name} for $${item.buy}`
  form.addSlider('Amount', 1, 128, 1, 1)
      .addToggle('Confirm Purchase?', false)
      .send((res) => {
        if (res.isCanceled) return category(player, item.category)
        if (!res.formValues[1]) return player.sendMessage('§cPurchase canceled.')
        if (item.buy * +res.formValues[0] > player.getScore('money')) return player.sendMessage(`§cInsufficent funds you need $${item.buy * +res.formValues[0]}.`)
        player.executeCommand(`give @s ${item.id} ${res.formValues[0]} ${item.data ?? 0}`)
        player.executeCommand(`scoreboard players remove @s money ${item.buy * +res.formValues[0]}`)
        player.sendMessage(`§aYou have successfully purchased x${+res.formValues[0]} ${item.name}.`)
      }) 
}