import { Player } from 'beapi-core'
import { categoryCollection, itemCollection } from '../database/index.js'
import { shop } from './index.js'

export function category(player: Player, categoryId: string): void {
    const category = categoryCollection.get(categoryId)
    const items = itemCollection.values().filter((x) => x.category === categoryId)
    const form = player.createActionForm()
    form.title = category.name
    for (const item of items) {
        form.addButton(item.name, item.icon ?? undefined)
    }
    form.send((res) => {
        if (res.isCanceled) return shop(player)
    })
}
