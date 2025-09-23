<template>
	<header>
		<h2>{{ pageTitle }}</h2>
	</header>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const pageTitle = computed(() => {
	if (route.path === '/') {
		return 'Главная страница';
	} else if (route.path === '/sticker') {
		return 'Организуй котиков на свой вкус!';
	}
	return '';
});
</script>
