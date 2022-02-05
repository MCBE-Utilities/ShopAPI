import { genUuid } from 'beapi-core'
import { categoryModel, itemModel } from './models/index.js'

export const categoryCollection = categoryModel
export const itemCollection = itemModel

export function addCategory(name: string, type: string, icon?: string): {added: boolean, categoryId?: string} {
  if (categoryCollection.findAll({}).find((x) => x.name === name)) return { added: false }

  const id = genUuid()
  categoryCollection.write({
      _id: id,
      name: name,
      type: type,
      icon: icon ?? undefined,
  }).save()

  return {
    added: true,
    categoryId: id,
  }
}

export function addItem(displayName: string, minecraftId: string, dataValue: number, categoryId: string, sellPrice: number, buyPrice: number, icon?: string): {added: boolean, itemId?: string} {
  if (itemCollection.findAll({}).find((x) => x.name === displayName && x.category === categoryId)) return { added: false }

  const id = genUuid()
  itemCollection.write({
      _id: id,
      name: displayName,
      id: minecraftId,
      data: dataValue,
      category: categoryId,
      icon: icon ?? undefined,
      sell: sellPrice,
      buy: buyPrice,
  }).save()

  return {
    added: true,
    itemId: id,
  }
}