import { pb } from '$lib/pocketbase';
import TaskItem from '$lib/server/stores/TaskItemStore';

import type ITicket from '$lib/interface/ITicket';
import type ITaskItem from '$lib/interface/ITaskItem';

export const load = async () => {
	// TODO: Remove this hard coded ticket ID
	const ticketID = 'gc0t2enzzzq0wm5';
	const task: ITicket = await pb.collection('tickets').getOne(ticketID);

	// TODO: Add this into the TaskItemStore
	const taskItems: ITaskItem[] = (
		await pb.collection('ticket_tasks').getList(1, 100, {
			filter: `ticketID = '${task.id}'`
		})
	).items;

	return {
		task: task.export(),
		taskItems: taskItems.map((r) => r.export()),
		ticketID: ticketID
	};
};

export const actions = {
	addTaskItem: async ({ cookies, request }) => {
		// TODO: Eventually move this into a model
		const formData = await request.formData();

		const ticketID = formData.get('ticketID');
		const taskDescription = formData.get('taskDescription');

		const results = await TaskItem.addTaskItem(ticketID, taskDescription);

		console.log(results);
		return {
			success: true
		};
	}
};
