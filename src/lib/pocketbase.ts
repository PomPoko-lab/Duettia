import config from './config';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(config.pocketBaseUrl);
