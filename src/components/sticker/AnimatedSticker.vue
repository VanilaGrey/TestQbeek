<template>
	<div
		class="sticker"
		@mouseenter="isHovered = true"
		@mouseleave="isHovered = false"
	>
		<div class="sticker__content" v-if="cats.length">
			<img
				v-for="cat in visibleCats"
				:key="cat"
				:src="cat"
				@click="selectCat(cat)"
				alt="котик"
				draggable="false"
			/>
		</div>

		<div v-else class="sticker__loading">🐱 Загрузка...</div>

		<div v-if="!isHovered" class="sticker__arrow-bar">
			<div class="sticker__arrow-bar-arrow"></div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCatStore } from "@/stores/catStore";

const catStore = useCatStore();

const cats = ref([]);
const isHovered = ref(false);

const loadCats = async () => {
	try {
		const res = await fetch("https://cataas.com/api/cats");
		const data = await res.json();
		cats.value = data.map(
			(cat) => `https://cataas.com/cat/${cat.id}?width=300&height=300`
		);
	} catch (error) {
		console.error("Ошибка загрузки котиков:", error);
	}
};

const visibleCats = computed(() =>
	isHovered.value ? cats.value : cats.value.slice(0, 3)
);

const selectCat = (url) => {
	if (!catStore.selectedCats.includes(url)) {
		catStore.addCat(url);
	}
};

onMounted(loadCats);
</script>

<style scoped lang="scss">
.sticker {
	position: fixed;
	top: 50%;
	right: 0;
	transform: translateY(-50%);
	width: 100px;
	height: 330px;
	background: #ffffff;
	padding: 10px;
	border-radius: 10px;
	box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
	overflow: hidden;
	cursor: pointer;
	transition: width 0.35s ease, height 0.35s ease;

	&:hover {
		width: 220px;
		height: 700px;
	}

	&__content {
		height: 100%;
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 12px;
		overflow-y: auto;
		scrollbar-width: none; /* Firefox */

		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari */
		}

		img {
			width: 100%;
			aspect-ratio: 1 / 1;
			border-radius: 6px;
			background: #f8f8f8;
			object-fit: contain;
			user-select: none;
			transition: transform 0.2s ease;

			&:hover {
				transform: scale(1.05);
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
			}
		}
	}

	&__loading {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #666;
		user-select: none;
	}

	&__arrow-bar {
		position: absolute;
		bottom: -5px;
		left: 23px;
		width: 80px;
		height: 40px;
		transform: translateY(-50%);
		background: #ddd;
		border-radius: 20px;
		display: flex;
		align-items: center;
		justify-content: center;

		&-arrow {
			width: 0;
			height: 0;
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-right: 12px solid #888;
		}
	}
}
</style>
