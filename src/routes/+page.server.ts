import Tickets from '$lib/server/models/Tickets';
import type { RequestEvent } from './$types';
import TicketTasksController from '$lib/server/controllers/TicketTasksController';

import type ITaskItem from '$lib/interface/ITaskItem';

const ticketsDB = new Tickets();
const ticketTaskController = new TicketTasksController();

export const load = async () => {
	// TODO: Remove this hard coded ticket ID
	const ticketID = 'gc0t2enzzzq0wm5';
	const ticket = (await ticketsDB.getOneRecord(ticketID)).export();

	const taskItems = await ticketTaskController.getAllAvailableTaskItemsByTicket(ticketID);
	const taskItemsJSON = taskItems.map((r) => r.export()) as ITaskItem[]; // List of task items for this ticket

	// Move the completed items to the bottom of the list
	taskItemsJSON.sort((a, b) => {
		if (a.completedBy && !b.completedBy) {
			return 1;
		} else if (!a.completedBy && b.completedBy) {
			return -1;
		} else {
			return 0;
		}
	});

	return {
		ticket: ticket,
		taskItems: taskItemsJSON,
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
