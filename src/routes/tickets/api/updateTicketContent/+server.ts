import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import TicketsController from '$lib/server/controllers/TicketsController';

const ticketsController = new TicketsController();

export const POST: RequestHandler = async ({ request }) => {
	const results = await ticketsController.updateTicketContent(request);
	return json(null, {
		status: 200
	});
};
