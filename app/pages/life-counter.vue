<template>
  <div>
    <NuxtLink to="/" class="back-btn">← Back</NuxtLink>
    <div class="life-counter-container">
      <h2>Life Counter</h2>
      <p>Life counter functionality coming soon.</p>
    </div>
  </div>
</template>

<script setup>
// Placeholder for future logic
</script>

<style scoped>
.back-btn {
  display: inline-block;
  margin: 2rem 0 1rem 0;
  padding: 0.5rem 1.2rem;
  font-size: 1.1rem;
  background: #eee;
  color: #333;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.2s;
  font-weight: 500;
}
.back-btn:hover {
  background: #007bff;
  color: #fff;
}
.dark .back-btn {
  background: #222;
  color: #e6edf3;
}
.dark .back-btn:hover {
  background: #4dabf7;
  color: #161b22;
}

.life-counter-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

