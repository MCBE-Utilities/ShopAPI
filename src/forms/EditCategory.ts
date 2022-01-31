import { Player } from 'beapi-core'
import { categoryCollection } from '../database/index.js'
import { viewCategory } from './index.js'

export function editCategory(player: Player, categoryId: string): void {
  const category = categoryCollection.get(categoryId)
  const form = player.createModalForm()
  form.title = `Editing ${category.name}`
  form.addInput('Category Name', category.name, category.name)
      .addInput('Category Type', category.type, category.type)
      .addInput('Texture Path', category.icon, category.icon)
  form.send((res) => {
    if (res.isCanceled) return viewCategory(player)
    categoryCollection.update(category._id, {
      _id: categoryId,
      name: res.formValues[0] ?? category.name,
      type: res.formValues[1] ?? category.type,
      icon: res.formValues[2] ?? category.icon,
    }).save()

    return player.sendMessage('§aCategory updated.')
  })
}