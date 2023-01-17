import { dev } from '$app/environment';

export const wsUrl = dev ? 'ws://localhost:3000' : 'wss://example.com';
