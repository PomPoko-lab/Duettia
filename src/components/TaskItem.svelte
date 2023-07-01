<script lang="ts">
	import { Button, Checkbox } from 'flowbite-svelte';

	export let taskId = '0';
	export let taskDescription = 'No description available';
	export let completedBy = '';
	const taskIsCompleted = completedBy === '' ? false : true;

	const markTaskCompleted = async (e: Event) => {
		const targetElement = e.target as HTMLInputElement;
		const taskItemId = targetElement.dataset.taskItemId as string;
		const isChecked = targetElement.checked;

		// TODO: Create an endpoint for stores
		const response = await fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ taskItemId, isChecked })
		});

		// TODO: Handle response
		console.log(response.ok);
	};
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<div
	id="taskItem_{taskId}"
	aria-label="Task item (#{taskId})"
	class="me-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700 p-4 sm:p-6 max-w-full"
>
	<div class="flex items-center gap-4 p-2 text-lg">
		<Checkbox
			data-task-item-id={taskId}
			on:change={markTaskCompleted}
			checked={taskIsCompleted}
			class="w-6 h-6"
		/>
		<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
			{taskDescription}
		</p>
		<div class="flex align-center gap-3 ms-auto">
			<Button outline color="light"><span class="material-icons">edit</span></Button>
			<Button outline color="green" class="hidden"><span class="material-icons">check</span></Button
			>
			<Button color="red"><span class="material-icons">close</span></Button>
		</div>
	</div>
</div>
