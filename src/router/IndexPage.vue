<template>
	<section class="index-page">
		<router-link class="index-page__link" to="/sticker">
			Перейти на страницу со стикером
			<span class="index-page__note">(тут котики)</span>
		</router-link>
	</section>
</template>

<script setup></script>

<style scoped lang="scss">
.index-page {
	padding: 0 20px;
	margin: 0 auto;
	max-width: 400px; /* ограничим ширину для лучшей читабельности */
	text-align: center;

	&__link {
		display: inline-flex;
		flex-direction: column;
		font-size: 14px;
		font-weight: 600;
		color: #007bff;
		text-decoration: none;
		cursor: pointer;
		transition: color 0.3s ease;

		&:visited {
			color: #0056b3;
		}

		&:hover,
		&:focus {
			color: #003f7f;
			text-decoration: underline;
		}
	}

	&__note {
		font-size: 12px;
		font-weight: 400;
		color: #555;
		margin-top: 4px;
	}
}
</style>
