<script lang="ts">
	import { DarkMode } from 'flowbite-svelte';
</script>

<section class="mt-auto flex mx-3 gap-2 justify-evenly">
	<button
		color="light"
		class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
	>
		<span class="material-icons-round"> logout </span>
	</button>
	<button
		color="light"
		class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
	>
		<span class="material-icons-round"> manage_accounts </span>
	</button>
	<DarkMode />
</section>
