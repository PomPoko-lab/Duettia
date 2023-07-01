import dotenv from 'dotenv';

dotenv.config();

export default {
	POCKETBASE_URL: process.env.PB_SERVER_ADDRESS, // The URL of the PocketBase server
	MY_USER_ID: '95q6fwvcekf55mw' // Hardcoded until auth is implemented
};
