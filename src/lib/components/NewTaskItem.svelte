<script lang="ts">
	// TODO: Eventually make this extend TaskItem.svelte to avoid duplicate code
	// Adjustments to TaskItem.svelte will require changing this component as well
	import { Button, Checkbox, Input } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let taskId = '0';
	export let taskDescription = '';
	export let completedBy = '';

	export let ticketID = '0';
	export let isAddingTask = false;
	export let taskItemsContainer;

	onMount(() => {
		scrollTopContainer();
	});

	// TODO: For this component and TaskItem, deprecate this evaluatuion and use the completedBy field instead
	// Check whether it's empty or not
	const taskIsCompleted = completedBy === '' ? false : true;

	const markTaskCompleted = async (e: Event) => {
		// TODO: REcord the user's ID when this is called
		// On form submission, set the completedBy field to the user's ID
		// const targetElement = e.target as HTMLInputElement;
		// const taskItemId = targetElement.dataset.taskItemId as string;
		// const isChecked = targetElement.checked;
		// // TODO: Create an endpoint for stores
		// const response = await fetch('/', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({ taskItemId, isChecked })
		// });
		// TODO: Handle response
	};

	const scrollTopContainer = () => {
		taskItemsContainer.scrollTop = taskItemsContainer.scrollHeight;
	};
</script>

<form
	action="?/addTaskItem"
	method="POST"
	use:enhance={() => {
		return async ({ update }) => {
			isAddingTask = false;
			scrollTopContainer();
			await update();
		};
	}}
>
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
			<Input class="hidden" type="text" name="ticketID" value={ticketID} />
			<Input
				class="font-normal text-gray-700 dark:text-gray-400 leading-tight"
				type="text"
				name="taskDescription"
				placeholder="Task description"
				bind:value={taskDescription}
				required
			/>
			<div class="flex align-center gap-3 ms-auto">
				<Button type="submit" color="green"><span class="material-icons">check</span></Button>
				<Button outline color="red"><span class="material-icons">close</span></Button>
			</div>
		</div>
	</div>
</form>
