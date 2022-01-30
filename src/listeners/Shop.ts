import { client } from 'beapi-core'
import { shop } from '../forms/index.js'

client.on('PlayerTag', (data) => {
    if (data.tag !== "shop") return

    return shop(data.player)
})
