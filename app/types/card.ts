import type { Pitch } from "~/types/pitch";

export interface Card {
    id: string
    name: string
    imageUrl?: string
    pitch: Pitch
}
