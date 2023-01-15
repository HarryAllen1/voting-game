import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ fetch }) => {
		const res = await fetch('/api/new', {
			method: 'POST',
		});
		const json = await res.json();
		throw redirect(303, `/${json.id}`);
	},
};
