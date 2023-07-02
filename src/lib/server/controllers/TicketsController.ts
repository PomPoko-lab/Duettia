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
}
