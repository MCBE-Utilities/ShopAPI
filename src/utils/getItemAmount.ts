import { Player } from 'beapi-core'

export function getItemAmount(player: Player, itemId: string, itemData: number): number {
  let amount = 0
  const inventory = player.getInventory().container
  for (let slot = 0; slot != inventory.size; slot++) {
    const item = inventory.getItem(slot)
    if (!item) continue
    if (item.id !== itemId || item.data !== itemData) continue
    amount = amount + item.amount
  }

  return amount
}