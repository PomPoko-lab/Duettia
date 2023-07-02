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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	expand: Record<string, any>;
	important: boolean;
	status: string;
}
