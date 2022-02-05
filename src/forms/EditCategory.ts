import { Player } from 'beapi-core'
import { categoryCollection } from '../database/index.js'
import { viewCategory } from './index.js'

export function editCategory(player: Player, categoryId: string): void {
  const category = categoryCollection.find({ _id: categoryId })
  const form = player.createModalForm()
  form.title = `Editing ${category.name}`
  form.addInput('Category Name', category.name, category.name)
      .addInput('Category Type', category.type, category.type)
      .addInput('Texture Path', category.icon, category.icon)
  form.send((res) => {
    if (res.isCanceled) return viewCategory(player)
    category.name = res.formValues[0] ?? category.name
    category.type = res.formValues[1] ?? category.type
    category.icon = res.formValues[2] ?? category.icon
    category.save()

    return player.sendMessage('§aCategory updated.')
  })
}