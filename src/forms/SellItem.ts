import { Player } from 'beapi-core'
import { itemCollection } from '../database/index.js'
import { category } from './index.js'
import { getItemAmount } from '../utils/index.js'

export function sellItem(player: Player, itemId: string): void {
  const item = itemCollection.get(itemId)
  const form = player.createModalForm()
  form.title = `Selling x1 ${item.name} for $${item.sell}`
  form.addSlider('Amount', 1, 128, 1, 1)
      .addToggle('Confirm Purchase?', false)
      .send((res) => {
        if (res.isCanceled) return category(player, item.category)
        if (!res.formValues[1]) return player.sendMessage('§cPurchase canceled.')
        const itemAmount = getItemAmount(player, item.id, item.data ?? 0)
        if (+res.formValues[0] > itemAmount) return player.sendMessage(`§cInsufficent funds you need x${+res.formValues[0]} ${item.name}.`)
        player.executeCommand(`clear @s ${item.id} ${item.data ?? 0} ${res.formValues[0]}`)
        player.executeCommand(`scoreboard players add @s money ${item.sell * +res.formValues[0]}`)
        player.sendMessage(`§aYou have successfully sold x${+res.formValues[0]} ${item.name} for $${item.sell * +res.formValues[0]}.`)
      }) 
}