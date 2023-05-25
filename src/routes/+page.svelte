<script lang="ts">
	import { Label, Textarea, Button } from 'flowbite-svelte';
	import TaskItem from '../components/TaskItem.svelte';

	export let data;
	const task = data.props.task;
	const taskItems = data.props.taskItems;
</script>

<div class="container mx-auto flex gap-6 my-6">
	<div class="grow w-1/3">
		<h5 class="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{task.title}
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
					completedBy={taskItem.completedBy}
				/>
			{/each}
		</div>
		<Button outline color="blue">
			<span class="material-icons">add</span>
			<span class="ms-2">Add task</span>
		</Button>
	</div>
</div>
