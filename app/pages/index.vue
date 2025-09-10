<template>
  <div class="page">
    <h1>Cards Timeline</h1>
    <input type="text" v-model="searchQuery" placeholder="Search cards..." class="search-input"/>
    <div v-if="searchQuery.length > 0 && searchQuery.length <= 3" class="warning">
      Please enter at least 4 characters to search.
    </div>
    <div class="card-grid">
      <div v-for="card in displayedCards" :key="card.cardIdentifier" class="card-shape">
        <template v-if="card.imageUrl">
          <img :src="card.imageUrl" alt="Card image" loading="lazy" @error="imageError($event, card)"
               v-if="!erroredCards[card.cardIdentifier]" class="card-image"/>
          <CardDetails v-else :card="card"/>
        </template>
        <template v-else>
          <CardDetails :card="card"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCardStore } from "~/stores/cardStore";
import { computed, ref } from 'vue'

const cardStore = useCardStore()
const searchQuery = ref('')
const erroredCards = ref({})

const displayedCards = computed(() => {
  if (searchQuery.value.length > 3) {
    return cardStore.search(searchQuery.value, 6)
  }
  return []
})

function imageError(event, card) {
  erroredCards[card.cardIdentifier] = true
}
</script>

<style scoped>
.search-input {
  margin-bottom: 1em;
  padding: 0.5em;
  width: 100%;
  max-width: 400px;
  font-size: 1em;
}

.warning {
  color: #b71c1c;
  background: #fff3f3;
  padding: 0.5em;
  margin-bottom: 1em;
  border-radius: 4px;
  font-size: 0.95em;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  margin-bottom: 2em;
}

.card-shape {
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 180px;
  justify-content: center;
}

.card-image {
  max-width: 100%;
  max-height: 140px;
  border-radius: 6px;
  object-fit: contain;
  margin-bottom: 0.5em;
}
</style>
