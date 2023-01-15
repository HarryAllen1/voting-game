import { toString } from 'qrcode';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	return {
		qrcode: await toString(url.href, { type: 'svg' }),
	};
}) satisfies PageLoad;
