import { genUuid } from 'beapi-core'
import { Database } from 'beapi-core'
import { Category, Item } from './models/index.js'

export const db = new Database('ShopAPI')

export const categoryCollection = db.mount<string, Category>('categories')
export const itemCollection = db.mount<string, Item>('items')

export function addCategory(name: string, type: string, icon?: string): {added: boolean, categoryId?: string} {
  if (categoryCollection.values().find((x) => x.name === name)) return { added: false }

  const id = genUuid()
  categoryCollection.set(id, {
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
  if (itemCollection.values().find((x) => x.name === displayName && x.category === categoryId)) return { added: false }

  const id = genUuid()
  itemCollection.set(id, {
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