<script lang="ts">
	import { Label, Textarea, Button } from 'flowbite-svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import NewTaskItem from '$lib/components/NewTaskItem.svelte';

	export let data;
	let ticketID = data.ticketID;

	let isAddingTask = false;
	let taskItemsContainer;

	const renderNewTaskItem = () => {
		// Show a new task item with the new item state
		isAddingTask = true;

		// Scroll the container to the new task item
		// This state shows an empty input field. Change the edit button to a checkmark to save the new task item
	};
</script>

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
