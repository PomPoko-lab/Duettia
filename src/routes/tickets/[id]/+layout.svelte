<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';
	import { page } from '$app/stores';

	import type ITicket from '$lib/interface/ITicket';

	const ticket = $page.data.ticket as ITicket;
</script>

<!-- Header -->
<svelte:head>
	<title>{ticket.title}</title>
</svelte:head>

<header class="mt-2 mb-6">
	<Breadcrumb aria-label="Solid background breadcrumb">
		<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
		<BreadcrumbItem href="/tickets">Tickets</BreadcrumbItem>
		<BreadcrumbItem>{ticket.title}</BreadcrumbItem>
	</Breadcrumb>
</header>
<slot />
