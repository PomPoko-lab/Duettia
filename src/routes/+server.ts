import { error, json } from '@sveltejs/kit';
import TaskItemStore from '$lib/server/stores/TaskItemStore';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		throw error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return new Response(String(random));
}

export async function POST({ request }) {
	const { taskItemId, isChecked } = await request.json();
	let completedBy = '';

	if (isChecked) {
		completedBy = '95q6fwvcekf55mw'; // Hardcoded until auth is implemented
	}

	// TODO: verify user is allowed to update this task
	// TODO: Handle the results of this update and return a 500 if it fails
	const results = (await TaskItemStore.updateTaskCompletedStatus(taskItemId, completedBy)).export();

	return json(null, {
		status: 200
	});
}
