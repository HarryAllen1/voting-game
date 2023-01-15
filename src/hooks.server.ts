import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from '$env/static/private';
import { type Handle, json } from '@sveltejs/kit';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit =
	UPSTASH_REDIS_REST_TOKEN && UPSTASH_REDIS_REST_URL
		? new Ratelimit({
				redis: new Redis({
					url: UPSTASH_REDIS_REST_URL,
					token: UPSTASH_REDIS_REST_TOKEN,
				}),
				// 10 requests per 10 seconds
				limiter: Ratelimit.slidingWindow(10, '10 s'),
		  })
		: null;

export const handle = (async ({ event, resolve }) => {
	// only ratelimit the api
	if (event.url.pathname.startsWith('/api') && ratelimit) {
		const identifier = event.getClientAddress();
		const { success, reset } = await ratelimit.limit(identifier);
		if (!success) {
			return json(
				{ message: 'Too many requests', remaining: reset - Date.now() },
				{
					status: 429,
				}
			);
		}
		const response = await resolve(event);
		return response;
	}

	const response = await resolve(event);
	return response;
}) satisfies Handle;
