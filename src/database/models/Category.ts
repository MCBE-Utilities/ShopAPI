import { schema, SchemaTypes, modal } from 'beapi-core'
import { Category } from '../../types/index.js'

const categorySchema = schema<Category>({
  _id: SchemaTypes.String,
  name: SchemaTypes.String,
  type: SchemaTypes.String,
  icon: SchemaTypes.String,
})

export const categoryModel = modal<Category>('categories', categorySchema)
