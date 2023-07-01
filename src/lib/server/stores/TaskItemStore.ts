import { pb } from '$lib/pocketbase';
// import type ITaskItem from '../../interface/ITaskItem';

export default class TaskItemStore {
	static async getData(taskId: string) {
		return await pb.collection('ticket_tasks').getOne(taskId);
		// const results = await pb.collection('ticket_tasks').getList(1, 100, {
		// 	filter: `ticketID = '${task.id}'`
		// }).items;
	}
	static updateTaskCompletedStatus(taskId: string, completedBy: string) {
		return pb.collection('ticket_tasks').update(taskId, {
			completedBy: completedBy
		});
	}
}
