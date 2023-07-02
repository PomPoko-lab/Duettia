<script lang="ts">
	import { Modal, Button } from 'flowbite-svelte';

	export let isOpen = true;
	export let allowOutsideClose = true;

	export let messageBody = 'Are you sure you want to perform this action?';

	export let confirmAction = () => {
		alert('Action performed');
	};
	export let cancelAction = () => {
		isOpen = false;
	};
</script>

<Modal bind:open={isOpen} size="xs" autoclose outsideclose={allowOutsideClose}>
	<div class="text-center">
		<svg
			aria-hidden="true"
			class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/></svg
		>
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			{@html messageBody}
		</h3>
		<Button on:click={confirmAction} color="red" class="mr-2">Confirm</Button>
		<Button on:click={cancelAction} color="alternative">Cancel</Button>
	</div>
</Modal>
