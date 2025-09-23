import { defineStore } from "pinia";
import { ref } from "vue";

export const useCatStore = defineStore("catStore", () => {
	const selectedCats = ref(Array(10).fill(null));

	function addCat(url) {
		const firstEmptyIndex = selectedCats.value.findIndex((cat) => !cat);
		if (firstEmptyIndex !== -1) {
			selectedCats.value[firstEmptyIndex] = url;
		}
	}

	function removeCat(url) {
		const index = selectedCats.value.indexOf(url);
		if (index !== -1) {
			selectedCats.value[index] = null;
		}
	}

	return { selectedCats, addCat, removeCat };
});
