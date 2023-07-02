import config from '$lib/config';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(config.POCKETBASE_URL);
