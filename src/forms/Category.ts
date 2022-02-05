import { Player } from 'beapi-core'
import { categoryCollection, itemCollection } from '../database/index.js'
import { shop, selectionPage, editShop } from './index.js'

export function category(player: Player, categoryId: string): void {
    const category = categoryCollection.find({ _id: categoryId })
    const items = itemCollection.findAll({}).filter((x) => x.category === categoryId)
    const form = player.createActionForm()
    if (items.length === 0) {
        form.body = '§cNo items found. Try adding some!'
        form.addButton('Edit Shop')
    }
    form.title = category.name
    for (const item of items) {
        form.addButton(item.name, item.icon ?? undefined)
    }
    form.send((res) => {
        if (res.isCanceled) return shop(player)
        if (items.length === 0) return editShop(player)
        
        return selectionPage(player, items[res.selection]._id)
    })
}
