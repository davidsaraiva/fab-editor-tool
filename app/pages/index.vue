<template>
  <div class="landing-container">
    <div class="landing-buttons">
      <NuxtLink to="/timeline" class="landing-btn">Timeline</NuxtLink>
      <NuxtLink to="/life-counter" class="landing-btn">Life Counter</NuxtLink>
    </div>
  </div>
</template>

<script setup>
// No logic needed for landing page
</script>

<style scoped>
.landing-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-buttons {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.landing-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 260px;
  min-height: 80px;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 16px;
  background: #007bff;
  color: #fff;
  text-decoration: none;
  transition: background 0.25s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  cursor: pointer;
  border: none;
}

.landing-btn:hover {
  background: #0056b3;
  transform: translateY(-4px) scale(1.04);
}

.dark .landing-btn {
  background: #4dabf7;
  color: #161b22;
}

.dark .landing-btn:hover {
  background: #1864ab;
  color: #fff;
}
</style>
