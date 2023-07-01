import { pb } from '$lib/pocketbase';
import TaskItem from '$lib/server/stores/TaskItemStore';
import config from '$lib/config';

import type ITicket from '$lib/interface/ITicket';
import type ITaskItem from '$lib/interface/ITaskItem';

export const load = async () => {
	// TODO: Remove this hard coded ticket ID
	const ticketID = 'gc0t2enzzzq0wm5';
	const task: ITicket = await pb.collection('tickets').getOne(ticketID);

	// TODO: Add this into the TaskItemStore
	const taskItems: ITaskItem[] = (
		await pb.collection('ticket_tasks').getList(1, 100, {
			filter: `ticketID = '${task.id}' && active = true`
		})
	).items;

	return {
		task: task.export(),
		taskItems: taskItems.map((r) => r.export()),
		ticketID: ticketID
	};
};

export const actions = {
	createTaskItem: async ({ cookies, request }) => {
		// TODO: Eventually move this into a model
		const formData = await request.formData();

		const ticketID = formData.get('ticketID');
		const taskDescription = formData.get('taskDescription');
		const taskIsCompleted = formData.get('taskIsCompleted') === '';
		let completedBy = '';

		if (taskIsCompleted) {
			completedBy = config.MY_USER_ID;
		}

		const results = await TaskItem.createTaskItem(ticketID, taskDescription, completedBy);

		return {
			success: true
		};
	},
	deleteTaskItem: async ({ cookies, request }) => {
		const formData = await request.formData();
		const taskID = formData.get('taskItemID');

		const results = await TaskItem.deleteTaskItem(taskID);
		return {
			success: true
		};
	}
};
