import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCatStore = defineStore('catStore', () => {
	const selectedCats = ref([]);

	function addCat(url) {
		selectedCats.value.push(url);
	}

	return { selectedCats, addCat };
});
