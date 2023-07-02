export default interface ITaskItem {
	id: string;
	ticketID: string;
	description: string;
	active: boolean;
	completedBy: string;
	collectionId: string;
	collectionName: string;
	created: string;
	updated: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expand: Record<string, any>;
}
