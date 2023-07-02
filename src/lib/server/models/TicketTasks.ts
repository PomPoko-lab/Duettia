import BaseModel from './baseModel';

export default class TicketTasks extends BaseModel {
	collection = 'ticket_tasks';

	async createRecord(values: object) {
		values = {
			...values,
			active: true
		};
		return super.createRecord(values);
	}
}
