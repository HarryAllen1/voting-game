<script lang="ts">
	import { browser, dev } from '$app/environment';
	import '@unocss/reset/tailwind.css';
	import { onMount } from 'svelte';
	import 'uno.css';

	onMount(async () => {
		if (browser && !dev) {
			const { inject } = await import('@vercel/analytics');
			inject();
		}
	});
</script>

<div class="prose"><slot /></div>
