import dotenv from 'dotenv';

dotenv.config();

export default {
	pocketBaseUrl: process.env.PB_SERVER_ADDRESS // The URL of the PocketBase server
};
