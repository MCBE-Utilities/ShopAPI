import { Player } from 'beapi-core'
import { itemCollection } from '../database/index.js'
import { viewCategory } from './index.js'

export function editItem(player: Player, itemId: string): void {
  const item = itemCollection.get(itemId)
  const form = player.createModalForm()
  form.title = `Editing ${item.name}`
  form.addInput('Item Id', item.id, item.id)
      .addInput('Data Value', `${item.data}`, `${item.data}`)
      .addInput('Display Name', item.name, item.name)
      .addInput('Texture Path', 'textures/blocks/dirt.png', item.icon)
      .addInput('Sell Amount', `${item.sell}`, `${item.sell}`)
      .addInput('Buy Amount', `${item.buy}`, `${item.buy}`)
      .addToggle('§cDelete Item?', false)
  form.send((res) => {
    if (res.isCanceled) return viewCategory(player)
    if (res.formValues[6]) {
      itemCollection.delete(item._id).save()

      return player.sendMessage('§aItem deleted.')
    }
    itemCollection.update(item._id, {
      _id: item._id,
      category: item.category,
      id: res.formValues[0] ?? item.id,
      data: +res.formValues[1] ?? item.data,
      name: res.formValues[2] ?? item.name,
      icon: res.formValues[3] ?? item.icon,
      sell: +res.formValues[4] ?? item.sell,
      buy: +res.formValues[5] ?? item.buy,
    }).save()

    return player.sendMessage('§aItem updated.')
  })
}