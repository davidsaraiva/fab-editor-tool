import Fuse, { type IFuseOptions } from 'fuse.js'
import type { Card } from "~/types/card"

class CardSearchService {
    private fuse: Fuse<Card>
    private cards: Card[] = []

    constructor() {
        const fuseOptions: IFuseOptions<Card> = {
            keys: [
                {
                    name: 'name',
                    weight: 0.7 // Higher weight for name matches
                },
                {
                    name: 'pitch',
                    weight: 0.3 // Lower weight for pitch matches
                }
            ],
            threshold: 0.3, // Lower = more strict matching (0.0 = exact, 1.0 = very loose)
            minMatchCharLength: 3, // Minimum characters to start searching
        }
        this.fuse = new Fuse(this.cards, fuseOptions)
    }

    /**
     * Update the search index with new cards data
     */
    public updateCards(cards: Card[]): void {
        if (this.cards.length !== cards.length) {
            console.log(`Updating search index with ${cards.length} cards`)
            this.cards = cards
            this.fuse.setCollection(cards)
        }
    }

    public search(cards: Card[], query: string, pageSize: number = 10): Card[] {
        this.updateCards(cards)
        return this.fuse.search(query, { limit: pageSize }).map(result => result.item)
    }
}

// Create a singleton instance
export const cardSearchService = new CardSearchService()
