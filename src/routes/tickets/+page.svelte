<script lang="ts">
	import { Listgroup, ListgroupItem } from 'flowbite-svelte';

	export let data;
	console.log(data);
</script>

<Listgroup>
	{#each data.tickets as ticket (ticket.id)}
		<ListgroupItem class="flex gap-6">
			<a class="basis-6/12" href="/tickets/{ticket.id}">
				{ticket.title}
			</a>
			<p>{ticket.category}</p>
			<p>{ticket.status}</p>
			<p>{ticket.important}</p>
			<p>{ticket.userID}</p>
		</ListgroupItem>
	{/each}
</Listgroup>
