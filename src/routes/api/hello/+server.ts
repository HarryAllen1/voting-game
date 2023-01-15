import type { RequestHandler } from './$types';

export const GET = (async () => {
	return new Response(JSON.stringify({ message: 'Hello world!' }));
}) satisfies RequestHandler;
