import { error, json } from '@sveltejs/kit';
import TaskItemStore from '$lib/server/stores/TaskItemStore';

import config from '$lib/config';

export async function POST({ request }) {
	// TODO: Move this into a form post handler
	const { taskItemId, isChecked } = await request.json();
	let completedBy = '';

	if (isChecked) {
		completedBy = config.MY_USER_ID; // Hardcoded until auth is implemented
	}

	// TODO: verify user is allowed to update this task
	// TODO: Handle the results of this update and return a 500 if it fails
	const results = (await TaskItemStore.updateTaskCompletedStatus(taskItemId, completedBy)).export();

	return json(null, {
		status: 200
	});
}
