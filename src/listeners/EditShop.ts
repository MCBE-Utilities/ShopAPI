import { client } from 'beapi-core'
import { editShop } from '../forms/index.js'

client.on('PlayerTag', (data) => {
    if (data.tag !== "edit_shop") return

    return editShop(data.player)
})
