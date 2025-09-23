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
				:class="{ used: catStore.selectedCats.includes(cat) }"
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
	if (catStore.selectedCats.includes(url)) {
		catStore.removeCat(url);
	} else {
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
	width: 100px;
	height: 330px;
	padding: 10px;
	overflow: hidden;
	background-color: $white;
	border-radius: 10px;
	box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
	transform: translateY(-50%);
	cursor: pointer;
	transition: width 0.35s ease, height 0.35s ease;

	&:hover {
		width: 220px;
		height: 700px;
	}

	&__content {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 10px;
		overflow-y: auto;
		gap: 12px;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}

		img {
			width: 100%;
			background: $white;
			border-radius: 6px;
			transition: transform 0.2s ease;
			user-select: none;
			aspect-ratio: 1 / 1;
			object-fit: contain;

			&:hover {
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
				transform: scale(1.05);
			}

			&.used {
				filter: brightness(0.5);
				transition: filter 0.3s ease;
			}
		}
	}

	&__loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: 14px;
		color: $grey;
		user-select: none;
	}

	&__arrow-bar {
		position: absolute;
		bottom: -5px;
		left: 23px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80px;
		height: 40px;
		background: $greyLight;
		border-radius: 20px;
		transform: translateY(-50%);

		&-arrow {
			width: 0;
			height: 0;
			border-top: 8px solid transparent;
			border-right: 12px solid $grey;
			border-bottom: 8px solid transparent;
		}
	}
}
</style>
