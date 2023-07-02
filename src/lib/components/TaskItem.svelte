<script lang="ts">
	import { Button, Checkbox, Input } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';

	export let taskId = '0';
	export let taskDescription = 'No description available';
	export let completedBy = '';
	export let showDeleteConfirmationModal = false;
	export let deleteTaskID = '';
	const taskIsCompleted = completedBy === '' ? false : true;

	let updateTaskFormSubmitBtn: HTMLButtonElement;
	let isEditingTask = false;
	let updatedTaskDescription = taskDescription;
	let editConfirmationModalActive = false;

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
			body: JSON.stringify({
				taskItemId,
				isChecked
			})
		});

		// TODO: Handle response
	};

	const setTaskForDeletion = () => {
		showDeleteConfirmationModal = true;
		deleteTaskID = taskId;
	};

	const exitEditingTask = () => {
		updatedTaskDescription = taskDescription;
		isEditingTask = false;
	};

	const updateTaskItem = async () => {
		updateTaskFormSubmitBtn.click();
	};

	const handleTaskItemUpdate: SubmitFunction = async () => {
		return async ({ update }) => {
			isEditingTask = false;
			update();
		};
	};
</script>

<ConfirmationModal
	bind:isOpen={editConfirmationModalActive}
	messageBody="New changes will be saved and cannot be undone. <br> Are you sure you want to continue?"
	confirmAction={updateTaskItem}
/>

{#if editConfirmationModalActive}
	<form action="?/updateTaskItem" method="post" use:enhance={handleTaskItemUpdate}>
		<input type="hidden" name="taskItemID" value={taskId} />
		<input type="hidden" name="taskDescription" value={updatedTaskDescription} />
		<button type="submit" class="hidden" bind:this={updateTaskFormSubmitBtn} />
	</form>
{/if}

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
		{#if isEditingTask}
			<Input type="text" bind:value={updatedTaskDescription} />
		{:else}
			<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
				{taskDescription}
			</p>
		{/if}
		<div class="flex align-center gap-3 ms-auto">
			{#if isEditingTask}
				<Button on:click={() => (editConfirmationModalActive = true)} color="green"
					><span class="material-icons">check</span></Button
				>
			{:else}
				<Button on:click={() => (isEditingTask = true)} outline color="light"
					><span class="material-icons">edit</span></Button
				>
			{/if}
			{#if isEditingTask}
				<Button on:click={exitEditingTask} outline color="red"
					><span class="material-icons">close</span></Button
				>
			{:else}
				<Button on:click={setTaskForDeletion} color="red"
					><span class="material-icons">close</span></Button
				>
			{/if}
		</div>
	</div>
</div>
