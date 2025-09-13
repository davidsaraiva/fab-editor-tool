<template>
  <div class="card-details">
    <h3 class="card-name">{{ card.name }}</h3>
    <div class="card-info">
      <span class="card-id">ID: {{ card.id }}</span>
      <span class="card-pitch" :class="`pitch-${card.pitch.toLowerCase()}`">
        {{ card.pitch }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "~/types/card";

interface Props {
  card: Card;
}

defineProps<Props>();
</script>

<style scoped>
.card-details {
  text-align: center;
  color: #333;
  font-size: 0.9rem;
  width: 100%;
}

.dark .card-details {
  color: #e6edf3;
}

.card-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.2;
}

.dark .card-name {
  color: #e6edf3;
}

.card-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
}

.card-id {
  color: #666;
  font-family: monospace;
}

.dark .card-id {
  color: #7d8590;
}

.card-pitch {
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.75rem;
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
  background-color: #21262d;
  color: #7d8590;
}
</style>
