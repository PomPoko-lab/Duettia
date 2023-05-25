export default interface ITaskItem {
	id: string;
	ticketID: string;
	description: string;
	active: boolean;
	completedBy?: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
}
