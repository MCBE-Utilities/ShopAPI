import { Database } from 'beapi-core'
import { Category, Item } from './models/index.js'

export const db = new Database('ShopAPI')

export const categoryCollection = db.mount<string, Category>('categories')
export const itemCollection = db.mount<string, Item>('items')
