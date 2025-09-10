<template>
  <div class="card-details">
    <strong>{{ card.name }}</strong><br />
    <span>ID: {{ card.cardIdentifier }}</span><br />
    <span>Pitch: {{ card.pitch }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "~/types/card";

interface Props {
  card: Card;
}
</script>

<style scoped>
.card-details {
  text-align: center;
  color: #333;
  font-size: 0.95em;
}
</style>
