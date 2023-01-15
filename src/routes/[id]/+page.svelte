<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	onMount(() => {
		const eventSource = new EventSource(`/api/join/${$page.params.id}`);
		eventSource.addEventListener('message', (event) => {
			console.log(event.data);
		});
	});
</script>

{@html data.qrcode}
