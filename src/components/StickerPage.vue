<template>
	<section class="sticker-page">
		<article
			v-for="n in 10"
			:key="'block-' + n"
			class="sticker-page__item"
			aria-label="Котик с подписью"
		>
			<img
				v-if="catStore.selectedCats[n - 1]"
				:src="catStore.selectedCats[n - 1]"
				:alt="catCaptions[n - 1] || 'Котик'"
				class="sticker-page__image"
			/>
			<p class="sticker-page__caption">
				{{ catCaptions[n - 1] || "" }}
			</p>
		</article>

		<AnimatedSticker />
	</section>
</template>

<script setup>
import { useCatStore } from '@/stores/catStore';
import { catCaptions } from '@/components/constants/catCaptions';
import AnimatedSticker from '@/components/sticker/AnimatedSticker.vue';

const catStore = useCatStore();
</script>

<style scoped lang="scss">
.sticker-page {
	display: grid;
	grid-template-columns: repeat(2, 360px);
	gap: 30px;
	padding: 40px;
	max-width: 1200px;
	margin: 0 auto;
}

.sticker-page__item {
	background-color: #d1c2c2;
	border-radius: 8px;
	padding: 16px;
	text-align: center;
	width: 300px;
	min-height: 360px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease;

	&:hover,
	&:focus-within {
		transform: translateY(-5px);
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
	}
}

.sticker-page__image {
	width: 100%;
	border-radius: 8px;
	object-fit: cover;
	flex-grow: 1;
	margin-bottom: 28px;
}

.sticker-page__caption {
	font-size: 14px;
	color: #444;
	font-style: italic;
	min-height: 1.2em;
	user-select: none;
	margin-top: auto;
}
</style>
