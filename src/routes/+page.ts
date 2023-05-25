import { pb } from '../lib/pocketbase';

import type ITicket from '../interfaces/ITicket';
import type ITaskItem from '../interfaces/ITaskItem';

export async function load() {
	const task: ITicket = await pb.collection('tickets').getOne('gc0t2enzzzq0wm5');
	const taskItems: ITaskItem[] = (
		await pb.collection('ticket_tasks').getList(1, 100, {
			filter: `ticketID = '${task.id}'`
		})
	).items;
	return {
		props: {
			task,
			taskItems
		}
	};
}
