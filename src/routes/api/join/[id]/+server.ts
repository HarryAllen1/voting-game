import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '$lib/server/firebase';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params: { id } }) => {
	let body = '';
	await new Promise<void>((resolve) => {
		onSnapshot(doc(db, 'games', id), (doc) => {
			body += `data: ${JSON.stringify(doc.data())}\n\n`;
			resolve();
		});
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive',
		},
	});
};
