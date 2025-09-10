<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useCardStore } from "~/stores/cardStore";

const cardStore = useCardStore()
await callOnce(cardStore.loadCardList)
</script>
