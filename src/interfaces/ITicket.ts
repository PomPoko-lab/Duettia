export default interface Ticket {
	userID: string;
	id: string;
	title: string;
	content?: string;
	category: string;
	collectionId: string;
	collectionName: string;
	completed: boolean;
	created: string;
	updated: string;
}
