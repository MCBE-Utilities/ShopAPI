import { Player } from 'beapi-core'
import { itemCollection } from '../database/index.js'
import { category, buyItem, sellItem } from './index.js'

export function selectionPage(player: Player, itemId: string): void {
  const item = itemCollection.get(itemId)
  const form = player.createActionForm()
  form.title = 'Buy or Sell'
  form.body = `Would you like to buy or sell §e${item.name}§r?`
  form.addButton('Buy')
      .addButton('Sell')
      .send((res) => {
        if (res.isCanceled) return category(player, item.category)
        switch (res.selection) {
          case 0:
            return buyItem(player, itemId)
          case 1: 
            return sellItem(player, itemId)
        }
      })
}