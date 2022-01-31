import { Player } from 'beapi-core'
import { categoryCollection, itemCollection } from '../database/index.js'
import { editCategory, editShop, deleteCategory, editItem } from './index.js'

export function viewCategory(player: Player): void {
  const form = player.createActionForm()
  form.title = 'Viewing Categories'
  const categories = categoryCollection.values()
  if (categories.length === 0) {
      form.body = '§cNo categories found. Try adding some!'
      form.addButton('Edit Shop')
  }
  for (const category of categories) {
      form.addButton(`${category.name}\n§9Click to Edit/View`, category.icon ?? undefined)
  }
  form.send((res) => {
      if (res.isCanceled || categories.length === 0) return editShop(player)
      
      return view(player, categories[res.selection]._id)
  })
}

export function view(player: Player, categoryId: string): void {
  const category = categoryCollection.get(categoryId)
  const items = itemCollection.values().filter((x) => x.category === categoryId)
  const form = player.createActionForm()
  form.title = `Viewing ${category.name}`
  form.addButton("Edit Category")
  form.addButton("Delete Category")
  for (const item of items) {
    form.addButton(`${item.name}\n§9Click to Edit`, item.icon ?? undefined)
  }
  form.send((res) => {
    if (res.isCanceled) return viewCategory(player)
    if (res.selection === 0) return editCategory(player, categoryId)
    if (res.selection === 1) return deleteCategory(player, categoryId)

    return editItem(player, items[res.selection - 2]._id)
  })
}