import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import TicketTasksController from '$lib/server/controllers/TicketTasksController';

const ticketTasksController = new TicketTasksController();

export const POST: RequestHandler = async ({ request }) => {
	const results = (await ticketTasksController.updateTaskCompletedStatus(request)).export();

	return json(null, {
		status: 200
	});
};
