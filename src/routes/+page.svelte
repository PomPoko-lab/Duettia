<script lang="ts">
	import { Label, Textarea, Button } from 'flowbite-svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import NewTaskItem from '$lib/components/NewTaskItem.svelte';
	import ConfirmationModal from '$lib/components/ConfirmationModal.svelte';
	import { enhance } from '$app/forms';

	export let data;
	let ticketID = data.ticketID;

	// The state of adding a new task item
	let isAddingTask = false;

	// These allow TaskItems to open the delete confirmation modal and set the task ID to be deleted
	let showDeleteConfirmationModal = false;
	let deleteTaskID = '0';
	let deleteFormSubmitBtn: HTMLButtonElement;

	// For scrolling the container to the new task item when it's added or new add is clicked
	let taskItemsContainer;

	const renderNewTaskItem = () => {
		// Show a new task item with the new item state
		isAddingTask = true;

		// Scroll the container to the new task item
		// This state shows an empty input field. Change the edit button to a checkmark to save the new task item
	};

	const deleteTaskItem = async () => {
		deleteFormSubmitBtn.click();
	};
</script>

<ConfirmationModal
	bind:isOpen={showDeleteConfirmationModal}
	messageBody="Are you sure you want to delete this task? <br> This cannot be undone."
	confirmAction={deleteTaskItem}
/>

<form method="POST" action="?/deleteTaskItem" use:enhance>
	<input type="hidden" name="taskItemID" value={deleteTaskID} />
	<button type="submit" class="hidden" bind:this={deleteFormSubmitBtn} />
</form>

<div class="container mx-auto flex gap-6 my-6">
	<div class="grow w-1/3">
		<h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{data.task.title}
		</h5>
		<div>
			<Label for="first_name" class="hidden">First name</Label>
			<Textarea type="text" id="first_name" placeholder="Content" required class="mb-3" rows="34" />
		</div>
	</div>
	<div class="grow w-2/3 flex flex-col">
		<div
			bind:this={taskItemsContainer}
			class="flex flex-col gap-6 overflow-y-scroll my-6 mt-14"
			style="max-height: 630px"
		>
			{#each data.taskItems as taskItem (taskItem.id)}
				<TaskItem
					taskId={taskItem.id}
					taskDescription={taskItem.description}
					completedBy={taskItem.completedBy}
					bind:showDeleteConfirmationModal
					bind:deleteTaskID
				/>
			{/each}
			{#if isAddingTask}
				<NewTaskItem {ticketID} bind:isAddingTask {taskItemsContainer} />
			{/if}
		</div>
		<Button on:click={renderNewTaskItem} outline color="blue">
			<span class="material-icons">add</span>
			<span class="ms-2">Add task</span>
		</Button>
	</div>
</div>
