<template>
  <div class="sticker" @mouseenter="loadCats">
    <div class="sticker-content" v-if="cats.length">
      <img v-for="(cat, index) in cats" :key="index" :src="cat" />
    </div>
    <div v-else class="loading">🐱 Загрузка...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cats = ref([]);

const loadCats = async () => {
	if (cats.value.length > 0) return;

	const urls = await Promise.all(
		Array.from({ length: 3 }, () => fetch('https://cataas.com/cat?width=300&height=300')
			.then((res) => res.blob())
			.then((blob) => URL.createObjectURL(blob))),
	);

	cats.value = urls;
};

onMounted(loadCats); // вызываем только 1 раз
</script>

<style scoped lang="scss">
.sticker {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 10px 0 0 10px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 100px;
  height: 60px;
  transition: width 0.4s ease;
  cursor: pointer;
  z-index: 999;

  &:hover {
    width: 220px;
	height: auto;
  }

.sticker-content {
  display: flex;
  flex-direction: column;
  padding: 10px;

  img {
    width: 100%;
    aspect-ratio: 1 / 1;   // делает квадрат
    object-fit: contain;   // сохраняет всю картинку, без обрезки
    background-color: #f0f0f0; // серый фон, если есть пустоты
    margin-bottom: 10px;
    border-radius: 5px;
  }
}

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 14px;
  }
}
</style>
