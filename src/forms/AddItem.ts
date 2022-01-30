import { Player, genUuid } from 'beapi-core'
import { categoryCollection, itemCollection } from '../database/index.js'
import { editShop } from './index.js'

export function addItem(player: Player, title = 'Enter an item you would like to add.'): void {
    const categories: string[] = []
    for (const c of categoryCollection.values()) {
        categories.push(c.name)
    }
    const form = player.createModalForm()
    form.title = 'Add Item'
    form.addInput(title, 'minecraft:dirt')
        .addInput('Display Name', 'Dirt')
        .addDropdown('Category', categories, 0)
        .addInput('Texture Path', 'textures/blocks/dirt.png')
        .addInput('Sell Amount', '100')
        .addInput('Buy Amount', '200')
        .send((res) => {
            if (res.isCanceled || res.formValues[0] === '') return editShop(player)
            const category = categoryCollection.values().find((x) => x.name === categories[res.formValues[2]])
            const id = genUuid()
            itemCollection.set(id, {
                _id: id,
                name: res.formValues[1],
                id: res.formValues[0],
                category: category._id,
                icon: res.formValues[3] ?? undefined,
                sell: res.formValues[4],
                buy: res.formValues[5],
            }).save()

            return addItem(player, '§aItem successfully added.')
        })
}
