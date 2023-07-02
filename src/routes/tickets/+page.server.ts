import type { PageServerLoad } from './$types';
import TicketsController from '$lib/server/controllers/TicketsController';
import type ITicket from '$lib/interface/ITicket';

const ticketsController = new TicketsController();

export const load: PageServerLoad = async (event) => {
	const tickets = await ticketsController.getAllTickets();
	const ticketsJSON = tickets.map((record) => record.export()) as ITicket[];

	return {
		tickets: ticketsJSON
	};
};
