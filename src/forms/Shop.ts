import { Player } from 'beapi-core'
import { categoryCollection } from '../database/index.js'
import { category, editShop } from './index.js'

export function shop(player: Player): void {
    const form = player.createActionForm()
    form.title = 'Shop Categories'
    const categories = categoryCollection.values()
    if (categories.length === 0) {
        form.body = '§cNo categories found. Try adding some!'
        form.addButton('Edit Shop')
    }
    for (const category of categories) {
        form.addButton(category.name, category.icon ?? undefined)
    }
    form.send((res) => {
        if (res.isCanceled) return
        if (categories.length === 0) return editShop(player)    
        return category(player, categories[res.selection]._id)
    })
}
