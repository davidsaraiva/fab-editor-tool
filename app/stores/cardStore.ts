import { defineStore } from 'pinia'
import { cards } from "@flesh-and-blood/cards";
import type { Card as FabCard } from '@flesh-and-blood/types';
import type { Card } from "~/types/card";
import { Pitch } from "~/types/pitch";
import { cardSearchService } from "~/middleware/services/cardSearchService";

export const useCardStore = defineStore('cardStore', {
    state: (): { cardList: Card[], isLoaded: boolean } => ({
        cardList: [],
        isLoaded: false  // ADD THIS LINE
    }),

    actions: {
        // TODO: This is being called every time page is refreshed
        async loadCardList() {
            if (this.isLoaded) {
                console.log("Cards already loaded")
                return // Prevent duplicate loading
            }

            try {
                console.info('Loading card list...')
                this.cardList = mapToLocal(cards as FabCard[])
                cardSearchService.updateCards(this.cardList)
            } catch (error) {
                console.error(error)
            }
            this.isLoaded = true // ADD THIS LINE
        },

        search(query: string, pageSize: number = 10): Card[] {
            if (!this.isLoaded) {
                console.warn('Cards not loaded yet!')
                return []
            }
            console.log('search store', query, pageSize)
            // TODO: debounce this?
            // TODO: cardList is not supposed to be provided here, investigate
            return cardSearchService.search(this.cardList, query, pageSize)
        }
    }
})

function mapToLocal(cards: FabCard[]): Card[] {
    return cards.map(card => ({
        name: card.name,
        id: card.cardIdentifier,
        imageUrl: `https://content.fabrary.net/cards/${card.defaultImage}.webp`,
        pitch: convertPitch(card.pitch)
    }))
}

function convertPitch(pitch: number | undefined): Pitch {
    if (pitch === 1) return Pitch.Red
    if (pitch === 2) return Pitch.Yellow
    if (pitch === 3) return Pitch.Blue
    return Pitch.None
}
