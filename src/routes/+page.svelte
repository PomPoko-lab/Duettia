<script lang="ts">
	import { Label, Textarea, Card, Button, Checkbox } from 'flowbite-svelte';
	import TaskItem from '../components/TaskItem.svelte';

	const taskItems = [
		{
			id: 0,
			taskId: 0,
			description: 'Do something 0',
			completed: false
		},
		{
			id: 1,
			taskId: 0,
			description: 'Do something 1',
			completed: true
		},
		{
			id: 2,
			taskId: 0,
			description: 'Do something 2',
			completed: false
		},
		{
			id: 3,
			taskId: 0,
			description: 'Do something 3',
			completed: false
		},
		{
			id: 4,
			taskId: 0,
			description: 'Do something 4',
			completed: true
		},
		{
			id: 5,
			taskId: 0,
			description: 'Do something 74',
			completed: false
		},
		{
			id: 75,
			taskId: 0,
			description: 'Do something 74',
			completed: false
		}
	];

	const task = {
		id: 0,
		userId: 0,
		title: 'Task title',
		description: 'Task description',
		completed: false
	};
</script>

<div class="container mx-auto flex gap-6 my-6">
	<div class="grow w-1/3">
		<h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Ticket title
		</h5>
		<div>
			<Label for="first_name" class="hidden">First name</Label>
			<Textarea type="text" id="first_name" placeholder="Content" required class="mb-3" rows="34" />
		</div>
	</div>
	<div class="grow w-2/3 flex flex-col">
		<div class="flex flex-col gap-6 overflow-y-scroll my-6 mt-14" style="max-height: 630px">
			{#each taskItems as taskItem (taskItem.id)}
				<TaskItem
					taskId={taskItem.id}
					taskDescription={taskItem.description}
					completed={taskItem.completed}
				/>
			{/each}
		</div>
		<Button outline color="blue">
			<span class="material-icons">add</span>
			<span class="ms-2">Add task</span>
		</Button>
	</div>
</div>
