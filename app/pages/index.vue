<template>
  <div class="page">
    <div class="search-container">
      <div class="search-wrapper">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search cards by name or pitch..." 
          class="search-input"
        />
      </div>
      
      <div class="filters-container">
        <div class="filter-group">
          <label class="filter-label">Filter by Pitch:</label>
          <div class="filter-buttons">
            <button 
              v-for="pitch in pitchOptions" 
              :key="pitch.value"
              @click="togglePitchFilter(pitch.value)"
              :class="['filter-button', `pitch-${pitch.value.toLowerCase()}`, { active: selectedPitches.includes(pitch.value) }]"
            >
              {{ pitch.label }}
            </button>
          </div>
        </div>
        
        <div class="clear-filters" v-if="selectedPitches.length > 0">
          <button @click="clearFilters" class="clear-button">
            Clear Filters
          </button>
        </div>
      </div>
      
      <div v-if="searchQuery.length > 1 && searchQuery.length < MIN_SEARCH_LENGTH" class="warning">
        Please enter at least {{ MIN_SEARCH_LENGTH }} characters to search.
      </div>
    </div>
    
    <div v-if="displayedCards.length > 0" class="card-grid">
      <div v-for="card in displayedCards" :key="card.id" class="card-shape">
        <template v-if="card.imageUrl">
          <img 
            :src="card.imageUrl" 
            :alt="card.name" 
            loading="lazy" 
            @error="imageError($event, card)"
            v-if="!erroredCards[card.id]" 
            class="card-image"
          />
          <CardDetails v-else :card="card"/>
        </template>
        <template v-else>
          <CardDetails :card="card"/>
        </template>
      </div>
    </div>
    
    <div v-else-if="searchQuery.length >= 3 || selectedPitches.length > 0" class="no-results">
      No cards found for your search criteria
    </div>
    
    <div v-else class="welcome-message">
      <h2>Welcome to Flesh & Blood Card Search</h2>
      <p>Start typing to search for cards by name or use the pitch filters below</p>
    </div>
  </div>
</template>

<script setup>
import { useCardStore } from "~/stores/cardStore";
import { computed, ref } from 'vue'
import { Pitch } from "~/types/pitch";

const MIN_SEARCH_LENGTH = 3

const cardStore = useCardStore()
const searchQuery = ref('')
const erroredCards = ref({})
const selectedPitches = ref([])

// Pitch filter options
const pitchOptions = [
  { value: Pitch.Red, label: 'Red' },
  { value: Pitch.Yellow, label: 'Yellow' },
  { value: Pitch.Blue, label: 'Blue' },
  { value: Pitch.None, label: 'None' }
]

const displayedCards = computed(() => {
  let cards = []
  
  // If we have a search query, use the search functionality
  if (searchQuery.value.length >= MIN_SEARCH_LENGTH) {
    cards = cardStore.search(searchQuery.value, 50) // Get more results for filtering
  } else if (selectedPitches.value.length > 0) {
    // If no search query but filters are active, get all cards
    cards = cardStore.cardList
  }
  
  // Apply pitch filters
  if (selectedPitches.value.length > 0) {
    cards = cards.filter(card => selectedPitches.value.includes(card.pitch))
  }
  
  return cards.slice(0, 20) // Limit to 20 results for performance
})

function togglePitchFilter(pitch) {
  const index = selectedPitches.value.indexOf(pitch)
  if (index > -1) {
    selectedPitches.value.splice(index, 1)
  } else {
    selectedPitches.value.push(pitch)
  }
}

function clearFilters() {
  selectedPitches.value = []
}

function imageError(event, card) {
  erroredCards.value[card.id] = true
}
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: transparent;
}

.dark .page {
  background-color: #0d1117;
}

.search-container {
  margin-bottom: 2rem;
}

.search-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background-color: white;
  color: #333;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.dark .search-input {
  background-color: #161b22;
  border-color: #30363d;
  color: #e6edf3;
}

.dark .search-input:focus {
  border-color: #4dabf7;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.filters-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.filter-label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.dark .filter-label {
  color: #e6edf3;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-button {
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.filter-button.active {
  border-color: currentColor;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
}

.dark .filter-button.active {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.pitch-red {
  background-color: #ffebee;
  color: #c62828;
}

.dark .pitch-red {
  background-color: #4a1a1a;
  color: #ffcdd2;
}

.pitch-yellow {
  background-color: #fff8e1;
  color: #f57f17;
}

.dark .pitch-yellow {
  background-color: #4a3a1a;
  color: #ffecb3;
}

.pitch-blue {
  background-color: #e3f2fd;
  color: #1565c0;
}

.dark .pitch-blue {
  background-color: #1a2a4a;
  color: #bbdefb;
}

.pitch-none {
  background-color: #f5f5f5;
  color: #666;
}

.dark .pitch-none {
  background-color: #404040;
  color: #999;
}

.clear-filters {
  margin-top: 0.5rem;
}

.clear-button {
  padding: 0.4rem 0.8rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-button:hover {
  background-color: #5a6268;
  transform: translateY(-1px);
}

.dark .clear-button {
  background-color: #495057;
}

.dark .clear-button:hover {
  background-color: #343a40;
}

.warning {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.dark .warning {
  color: #f8d7da;
  background-color: #721c24;
  border-color: #f5c6cb;
}

.welcome-message {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
}

.dark .welcome-message {
  color: #7d8590;
}

.welcome-message h2 {
  margin-bottom: 1rem;
  color: #333;
}

.dark .welcome-message h2 {
  color: #e6edf3;
}

.no-results {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.dark .no-results {
  color: #7d8590;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card-shape {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 200px;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.card-shape:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.dark .card-shape {
  background-color: #161b22;
  border-color: #30363d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dark .card-shape:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
}

.card-image {
  max-width: 100%;
  max-height: 150px;
  border-radius: 8px;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .page {
    padding: 1rem;
  }
  
  .search-wrapper {
    margin-bottom: 1rem;
  }
  
  .search-input {
    max-width: 100%;
  }
  
  .filters-container {
    gap: 0.75rem;
  }
  
  .filter-buttons {
    gap: 0.25rem;
  }
  
  .filter-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
  
  .card-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .card-shape {
    min-height: 160px;
    padding: 0.75rem;
  }
  
  .card-image {
    max-height: 120px;
  }
}
</style>
