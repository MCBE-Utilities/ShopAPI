import { Player } from 'beapi-core'
import { categoryCollection } from '../database/index.js'
import { category } from './index.js'

export function shop(player: Player): void {
    const form = player.createActionForm()
    form.title = 'Shop Categories'
    const categories = categoryCollection.values()
    for (const category of categories) {
        form.addButton(category.name, category.icon ?? undefined)
    }
    form.send((res) => {
        if (res.isCanceled) return
        category(player, categories[res.selection]._id)
    })
}
