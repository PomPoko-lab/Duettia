import { pb } from '$lib/pocketbase';
// import type ITaskItem from '../../interface/ITaskItem';

// TODO: Sanitize inputs
// TODO: Move this into a model

export default class TaskItemStore {
	static async createTaskItem(ticketID: string, taskDescription: string, completedBy: string) {
		return await pb.collection('ticket_tasks').create({
			ticketID: ticketID,
			description: taskDescription,
			completedBy: completedBy,
			active: true
		});
	}

	static async getData(taskId: string) {
		return await pb.collection('ticket_tasks').getOne(taskId);
		// const results = await pb.collection('ticket_tasks').getList(1, 100, {
		// 	filter: `ticketID = '${task.id}'`
		// }).items;
	}

	// TODO: Create a type for these values
	static async updateTaskItem(taskId: string, values: object) {
		return await pb.collection('ticket_tasks').update(taskId, values);
	}

	static async updateTaskCompletedStatus(taskId: string, completedBy: string) {
		return await pb.collection('ticket_tasks').update(taskId, {
			completedBy: completedBy
		});
	}

	static async deleteTaskItem(taskId: string, doHardDelete = false) {
		if (doHardDelete) {
			return await pb.collection('ticket_tasks').delete(taskId);
		}

		return await pb.collection('ticket_tasks').update(taskId, {
			active: false
		});
	}
}
