import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/server/firebase';
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const POST = (async () => {
	const ref = await addDoc(collection(db, 'games'), {});
	return json({
		id: ref.id,
	});
}) satisfies RequestHandler;
