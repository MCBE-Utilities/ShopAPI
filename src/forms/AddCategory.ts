import { Player, genUuid } from 'beapi-core'
import { categoryCollection } from '../database/index.js'
import { editShop } from './index.js'

export function addCategory(player: Player, title = 'Enter a category name you would like to add.'): void {
    const form = player.createModalForm()
    form.title = 'Add Category'
    form.addInput(title, 'Category Name')
        .addInput('Category Type', 'Type', 'blocks')
        .addInput('Texture Path', 'textures/blocks/diamond_ore.png')
        .send((res) => {
            if (res.isCanceled || res.formValues[0] === '') return editShop(player)
            if (categoryCollection.findAll({}).find((x) => x.name === res.formValues[0])) return addCategory(player, `§cThe category "${res.formValues[0]}" already exists. Try a different name.`)
            const id = genUuid()
            categoryCollection.write({
                _id: id,
                name: res.formValues[0],
                type: res.formValues[1],
                icon: res.formValues[2] ?? undefined,
            }).save()

            return addCategory(player, '§aCategory successfully added.')
        })
}
