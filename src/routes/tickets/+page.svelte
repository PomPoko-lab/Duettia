<script lang="ts">
	import { Listgroup, ListgroupItem } from 'flowbite-svelte';
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

	export let data;
	// console.log(data);
</script>

<header class="mt-2 mb-6">
	<Breadcrumb aria-label="Solid background breadcrumb">
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/tickets">Tickets</BreadcrumbItem>
		<!-- <BreadcrumbItem>Item Name</BreadcrumbItem> -->
	</Breadcrumb>
</header>

<Listgroup active>
	{#each data.tickets as ticket (ticket.id)}
		<ListgroupItem class="flex gap-2 md:gap-6 items-center">
			<a class="w-full sm:basis-8/12" href="/tickets/{ticket.id}">
				{ticket.title}
			</a>
			<p class="hidden sm:block w-full sm:basis-1/12">{ticket.category}</p>
			<p class="w-full sm:basis-3/12 md:1/12">{ticket.status}</p>
			<p class="d:block sm:basis-1/12">!</p>
			<p class="hidden sm:block sm:basis-1/12">I</p>
		</ListgroupItem>
	{/each}
</Listgroup>
