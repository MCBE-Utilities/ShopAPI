import { Player } from 'beapi-core'
import { categoryCollection, itemCollection } from '../database/index.js'
import { view } from './index.js'

export function deleteCategory(player: Player, categoryId: string): void {
  const category = categoryCollection.find({ _id: categoryId })
  const items = itemCollection.findAll({}).filter((x) => x.category === categoryId)
  const form = player.createMessageForm()
  form.title = `Deleting ${category.name}?`
  form.body = `Are you sure you want to delete §e${category.name}§r which has §e${items.length}§r item(s)? If you do so, your added items will not be recoverable.`
  form.button1 = 'Confirm'
  form.button2 = 'Cancel'
  form.send((res) => {
    if (res.isCanceled || res.selection === 0) return view(player, categoryId)
      
    for (const item of items) {
      item.delete()
    }
    category.delete()

    return player.sendMessage('§aCategory deleted.')
  })
}
