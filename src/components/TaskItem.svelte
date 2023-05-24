<script lang="ts">
	import { Button, Checkbox } from 'flowbite-svelte';

	export let taskId = 0;
	export let taskDescription = 'No description available';
	export let completed = false;
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a
	id="taskItem_{taskId}"
	href="javascript:void(0);"
	aria-label="Task item (#{taskId})"
	class="me-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 shadow-md flex flex-col hover:bg-gray-100 dark:hover:bg-gray-700 p-4 sm:p-6 max-w-full"
>
	<div class="flex items-center gap-4 p-2 text-lg">
		<Checkbox checked={completed} class="w-6 h-6" />
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
</a>
