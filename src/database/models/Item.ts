import { schema, SchemaTypes, modal } from 'beapi-core'
import { Item } from '../../types/index.js'

const itemSchema = schema<Item>({
  _id: SchemaTypes.String,
  name: SchemaTypes.String,
  id: SchemaTypes.String,
  data: SchemaTypes.Number,
  icon: SchemaTypes.String,
  category: SchemaTypes.String,
  sell: SchemaTypes.Number,
  buy: SchemaTypes.Number,
})

export const itemModel = modal<Item>('items', itemSchema)
