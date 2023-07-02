import type { RequestEvent } from '@sveltejs/kit';
import config from '$lib/config';
import TicketTasks from '$lib/server/models/TicketTasks';

export default class TicketTasksController {
	ticketTasksDB: TicketTasks;

	constructor() {
		this.ticketTasksDB = new TicketTasks();
	}

	/**
	 * Gets all available task items for a given ticket
	 * @param ticketID
	 * @returns {ITaskItem[]}
	 */

	async getAllAvailableTaskItemsByTicket(ticketID: string) {
		return (
			await this.ticketTasksDB.getListRecord(1, 100, {
				filter: `ticketID = '${ticketID}' && active = true`
			})
		).items;
	}

	/**
	 * Form event handler for creating a new task item
	 * @param event
	 * @returns {ITaskItem}
	 */
	async createTaskItem(event: RequestEvent) {
		const { request } = event;
		const formData = await request.formData();

		const ticketID = formData.get('ticketID');
		const taskDescription = formData.get('taskDescription');
		const taskIsCompleted = formData.get('taskIsCompleted') === '';
		let completedBy = '';

		if (taskIsCompleted) {
			completedBy = config.MY_USER_ID;
		}

		return await this.ticketTasksDB.createRecord({
			ticketID: ticketID,
			description: taskDescription,
			completedBy: completedBy
		});
	}

	/**
	 * Form event handler for updating a task item
	 * @param event
	 * @returns {ITaskItem}
	 */

	async updateTaskItem(event: RequestEvent) {
		const { request } = event;
		const formData = await request.formData();

		const taskID = formData.get('taskItemID') as string;
		const taskDescription = formData.get('taskDescription');

		const updatedValues = {
			description: taskDescription
		};

		return await this.ticketTasksDB.updateRecord(taskID, updatedValues);
	}

	/**
	 * Form event handler for deleting a task item
	 * @param event
	 * @returns {ITaskItem}
	 */
	async deleteTaskItem(event: RequestEvent) {
		const { request } = event;
		const formData = await request.formData();

		const taskID = formData.get('taskItemID') as string;

		return await this.ticketTasksDB.deleteRecord(taskID);
	}
}
