import { defineStore } from 'pinia'
import { cards } from "@flesh-and-blood/cards";
import type { Card as FabCard } from '@flesh-and-blood/types';
import type { Card } from "~/types/card";
import { Pitch } from "~/types/pitch";
import { cardSearchService } from "~/middleware/services/cardSearchService";

export const useCardStore = defineStore('cardStore', {
    state: () => ({
        cardList: [] as Card[],
        isLoaded: false
    }),

    actions: {
        async loadCardList() {
            // Prevent duplicate loading
            if (this.isLoaded) {
                console.log("Cards already loaded")
                return
            }

            try {
                console.info('Loading card list...')
                this.cardList = mapToLocal(cards as FabCard[])
                cardSearchService.updateCards(this.cardList)
                this.isLoaded = true
                console.log(`Loaded ${this.cardList.length} cards`)
            } catch (error) {
                console.error('Failed to load cards:', error)
            }
        },

        search(query: string, pageSize: number = 10): Card[] {
            if (!this.isLoaded) {
                console.warn('Cards not loaded yet!')
                return []
            }
            
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
    switch (pitch) {
        case 1: return Pitch.Red
        case 2: return Pitch.Yellow
        case 3: return Pitch.Blue
        default: return Pitch.None
    }
}
