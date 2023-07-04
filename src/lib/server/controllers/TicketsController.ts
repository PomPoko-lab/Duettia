import Tickets from '$lib/server/models/Tickets';

export default class TicketsController {
	ticketsDB: Tickets;

	constructor() {
		this.ticketsDB = new Tickets();
	}

	async getAllTickets() {
		const tickets = await this.ticketsDB.getFullListOfRecords({
			sort: '-created'
		});
		return tickets;
	}

	async updateTicketContent(request: Request) {
		const { ticketID, content } = await request.json();

		return await this.ticketsDB.updateRecord(ticketID, {
			content: content
		});
	}
}
