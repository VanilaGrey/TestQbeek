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
				:class="{ selected: catStore.selectedCats[n - 1] }"
			/>
			<p class="sticker-page__caption">
				{{ catCaptions[n - 1] || "" }}
			</p>
		</article>

		<AnimatedSticker />
	</section>
</template>

<script setup>
import { useCatStore } from "@/stores/catStore";
import { catCaptions } from "@/components/constants/catCaptions";
import AnimatedSticker from "@/components/sticker/AnimatedSticker.vue";

const catStore = useCatStore();
</script>

<style scoped lang="scss">
.sticker-page {
	display: grid;
	grid-template-columns: repeat(2, 360px);
	max-width: 1200px;
	margin: 0 auto;
	padding: 40px;
	gap: 30px;
}

.sticker-page__item {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	width: 300px;
	min-height: 360px;
	padding: 16px;
	text-align: center;
	background-color: $greyLight;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease;

	&:hover,
	&:focus-within {
		box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
		transform: translateY(-5px);
	}
}

.sticker-page__image {
	flex-grow: 1;
	width: 100%;
	margin-bottom: 28px;
	border-radius: 8px;
	object-fit: cover;
}

.sticker-page__caption {
	min-height: 1.2em;
	margin-top: auto;
	font-size: 14px;
	color: $black;
	font-style: italic;
	user-select: none;
}
</style>
