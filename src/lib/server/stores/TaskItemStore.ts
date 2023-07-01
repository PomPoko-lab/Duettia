import { pb } from '$lib/pocketbase';
// import type ITaskItem from '../../interface/ITaskItem';

// TODO: Sanitize inputs
// TODO: Move this into a model

export default class TaskItemStore {
	static async getData(taskId: string) {
		return await pb.collection('ticket_tasks').getOne(taskId);
		// const results = await pb.collection('ticket_tasks').getList(1, 100, {
		// 	filter: `ticketID = '${task.id}'`
		// }).items;
	}
	static async updateTaskCompletedStatus(taskId: string, completedBy: string) {
		return await pb.collection('ticket_tasks').update(taskId, {
			completedBy: completedBy
		});
	}

	static async addTaskItem(ticketID: string, taskDescription: string) {
		return await pb.collection('ticket_tasks').create({
			ticketID: ticketID,
			description: taskDescription
		});
	}
}
