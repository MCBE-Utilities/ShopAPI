import { Player } from 'beapi-core'
import { addCategory, addItem, viewCategory } from './index.js'

export function editShop(player: Player): void {
    const form = player.createActionForm()
    form.title = 'Edit Shop'
    form.addButton('Add Category')
        .addButton('Add Item')
        .addButton('View Categories')
        .send((res) => {
            if (res.isCanceled) return
            switch (res.selection) {
                case 0:
                    return addCategory(player)
                case 1:
                    return addItem(player)
                case 2: 
                    return viewCategory(player)
            }
        })
}