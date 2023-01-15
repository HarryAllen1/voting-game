<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	// export let form: ActionData;
</script>

<h1>Voting Game</h1>
<form method="POST" use:enhance>
	<input type="text" />
	<button type="submit" on:click={() => new Audio('/beep.wav').play()}>New Game</button>
</form>
