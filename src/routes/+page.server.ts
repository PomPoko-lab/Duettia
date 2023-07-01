import { pb } from '$lib/pocketbase';
import TaskItem from '$lib/server/stores/TaskItemStore';

import type ITicket from '$lib/interface/ITicket';
import type ITaskItem from '$lib/interface/ITaskItem';

export async function load() {
	// TODO: Remove this hard coded ticket ID
	const task: ITicket = await pb.collection('tickets').getOne('gc0t2enzzzq0wm5');

	// TODO: Add this into the TaskItemStore
	const taskItems: ITaskItem[] = (
		await pb.collection('ticket_tasks').getList(1, 100, {
			filter: `ticketID = '${task.id}'`
		})
	).items;

	return {
		props: {
			task: task.export(),
			taskItems: taskItems.map((r) => r.export())
		}
	};
}
