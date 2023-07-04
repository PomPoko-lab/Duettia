<script lang="ts">
	import { Button, Checkbox, Input } from 'flowbite-svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { invalidateAll } from '$app/navigation';

	export let taskId: string;
	export let taskDescription: string;
	export let completedBy: string;
	$: taskIsCompleted = completedBy === '' ? false : true; // If there's a userid, it's completed by them

	// Editing Task states
	let isEditingTask = false; // Manages the editing task state
	let showEditConfirmationModal = false;
	let updateTaskFormSubmitBtn: HTMLButtonElement;
	let updatedTaskDescription = taskDescription;

	// Delete Task states
	let showDeleteConfirmationModal = false;
	let deleteFormSubmitBtn: HTMLButtonElement;

	/**
	 * Marks a task as completed or incomplete. Rather than submitting a form, this uses fetch to send the data to the server.
	 * @param e The event object
	 */
	const markTaskCompleted = async (e: Event) => {
		const targetElement = e.target as HTMLInputElement;
		const taskItemId = targetElement.dataset.taskItemId as string;
		const isChecked = targetElement.checked;

		// TODO: Create an endpoint for stores
		const response = await fetch('/tickets/api/updateTaskCompletionStatus', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				taskItemId,
				isChecked
			})
		});

		await invalidateAll(); // Refresh the page's data

		// TODO: Handle response
	};

	/**
	 * Closes editing task state and resets the task description to the original value
	 */
	const exitEditingTask = () => {
		updatedTaskDescription = taskDescription;
		isEditingTask = false;
	};

	/**
	 * Callback for the confirmation modal's confirm button
	 * Submits the update task form
	 */
	const updateTaskItem = async () => {
		updateTaskFormSubmitBtn.click();
	};

	/**
	 * Callback when submitting the update task forms
	 */
	const handleTaskItemUpdate: SubmitFunction = async () => {
		// Executes before the form is submitted
		return async ({ update }) => {
			// Executes after the form is submitted
			isEditingTask = false;
			await update(); // Runs defaults from use:enhance
		};
	};

	const deleteTaskItem = async () => {
		deleteFormSubmitBtn.click();
	};
</script>

<!-- Edit Task -->
<ConfirmationModal
	bind:isOpen={showEditConfirmationModal}
	messageBody="New changes will be saved and cannot be undone. <br> Are you sure you want to continue?"
	confirmAction={updateTaskItem}
/>

{#if showEditConfirmationModal}
	<form action="?/updateTaskItem" method="post" use:enhance={handleTaskItemUpdate}>
		<input type="hidden" name="taskItemID" value={taskId} />
		<input type="hidden" name="taskDescription" value={updatedTaskDescription} />
		<button type="submit" class="hidden" bind:this={updateTaskFormSubmitBtn} />
	</form>
{/if}

<!-- Delete Task -->
<ConfirmationModal
	bind:isOpen={showDeleteConfirmationModal}
	messageBody="Are you sure you want to delete this task? <br> This cannot be undone."
	confirmAction={deleteTaskItem}
/>

{#if showDeleteConfirmationModal}
	<form method="POST" action="?/deleteTaskItem" use:enhance>
		<input type="hidden" name="taskItemID" value={taskId} />
		<button type="submit" class="hidden" bind:this={deleteFormSubmitBtn} />
	</form>
{/if}

<div
	id="taskItem_{taskId}"
	aria-label="Task item (#{taskId})"
	class="me-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex-col hover:bg-gray-100 dark:hover:bg-gray-700 p-2 sm:p-3 max-w-full relative"
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
			<p
				class="font-normal text-gray-{taskIsCompleted
					? '400'
					: '700'} dark:text-gray-400 leading-tight"
			>
				{taskDescription}
			</p>
		{/if}
		<div class="flex align-center gap-3 ms-auto">
			{#if isEditingTask}
				<Button on:click={() => (showEditConfirmationModal = true)} color="green"
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
				<Button on:click={() => (showDeleteConfirmationModal = true)} color="red"
					><span class="material-icons">close</span></Button
				>
			{/if}
		</div>
	</div>
</div>
