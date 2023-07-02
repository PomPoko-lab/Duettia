import Tickets from '$lib/server/models/Tickets';
import type { RequestEvent } from '@sveltejs/kit';
import TicketTasksController from '$lib/server/controllers/TicketTasksController';

import type ITaskItem from '$lib/interface/ITaskItem';

const ticketsDB = new Tickets();
const ticketTaskController = new TicketTasksController();

export const load = async () => {
	// TODO: Remove this hard coded ticket ID
	const ticketID = 'gc0t2enzzzq0wm5';
	const ticket = await ticketsDB.getOneRecord(ticketID);

	const taskItems: ITaskItem[] = await ticketTaskController.getAllAvailableTaskItemsByTicket(
		ticketID
	);

	return {
		ticket: ticket.export(),
		taskItems: taskItems.map((r) => r.export()),
		ticketID: ticketID
	};
};

export const actions = {
	createTaskItem: async (event: RequestEvent) => {
		const results = await ticketTaskController.createTaskItem(event);

		// TODO: Handle the results of this update and return a 500 if it fails
		return {
			success: true
		};
	},
	updateTaskItem: async (event: RequestEvent) => {
		const results = await ticketTaskController.updateTaskItem(event);

		return {
			success: true
		};
	},
	deleteTaskItem: async (event: RequestEvent) => {
		const results = await ticketTaskController.deleteTaskItem(event);

		return {
			success: true
		};
	}
};
