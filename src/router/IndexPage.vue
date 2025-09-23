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
	max-width: 400px;
	margin: 0 auto;
	padding: 0 20px;
	text-align: center;

	&__link {
		display: inline-flex;
		flex-direction: column;
		font-weight: 600;
		font-size: 14px;
		color: $blue;
		text-decoration: none;
		cursor: pointer;
		transition: color 0.3s ease;

		&:visited {
			color: $blue;
		}

		&:hover,
		&:focus {
			color: $blueDark;
			text-decoration: underline;
		}
	}

	&__note {
		margin-top: 4px;
		font-weight: 400;
		font-size: 12px;
		color: $grey;
	}
}
</style>
