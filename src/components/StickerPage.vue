<template>
  <div class="sticker-page">
    <div class="content">
      <p v-for="n in 50" :key="n">Контент строки №{{ n }}</p>
    </div>
    <AnimatedSticker />
  </div>
</template>

<script setup>
import AnimatedSticker from './sticker/AnimatedSticker.vue';
</script>

<style scoped lang="scss">
.sticker-page {
  position: relative;
  padding: 2rem;
}

.content {
  height: 200vh; // добавим скрол
}
</style>
