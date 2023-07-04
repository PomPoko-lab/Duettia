<script lang="ts">
	import { Label, Textarea, Button, Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import TaskItem from '$lib/components/TaskItem.svelte';
	import NewTaskItem from '$lib/components/NewTaskItem.svelte';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	export let data;

	// The state of adding a new task item
	let isAddingTask = false;

	// For scrolling the container to the new task item when it's added or new add is clicked
	let taskItemsContainer: HTMLDivElement;

	const scrollToBottomOfTasks = () => {
		taskItemsContainer.scrollTop = taskItemsContainer.scrollHeight;
	};

	// Store the ticket content in a variable so we can update it on blur
	let ticketContent = data.ticket.content;

	const updateFormField = async (e: FocusEvent) => {
		// Ignore if the content hasn't changed
		if (ticketContent === data.ticket.content) {
			return;
		}

		const response = await fetch('/tickets/api/updateTicketContent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				ticketID: data.ticketID,
				content: ticketContent
			})
		});

		await invalidateAll(); // Refresh the page's data
		console.log(ticketContent);
	};
</script>

<div class="container mx-auto flex gap-6 my-6 flex-col md:flex-row">
	<div class="grow w-full md:w-2/4">
		<h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{data.ticket.title}
		</h5>
		<div>
			<Label for="ticketContent" class="hidden" />
			<Textarea
				type="text"
				name="ticketContent"
				placeholder="Content"
				bind:value={ticketContent}
				required
				class="mb-3"
				rows="34"
				on:blur={updateFormField}
			/>
		</div>
	</div>
	<div class="grow w-full md:w-2/4 flex flex-col">
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
				<NewTaskItem ticketID={data.ticketID} bind:isAddingTask {scrollToBottomOfTasks} />
			{/if}
		</div>
		<Button disabled={isAddingTask} on:click={() => (isAddingTask = true)} outline color="primary">
			<span class="material-icons">add</span>
			<span class="ms-2">Add task</span>
		</Button>
	</div>
</div>
