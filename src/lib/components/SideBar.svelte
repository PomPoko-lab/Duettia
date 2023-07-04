<script lang="ts">
	import { Sidebar, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
	import SidebarFooter from './SidebarFooter.svelte';
	let spanClass = 'flex-1 ml-3 whitespace-nowrap';

	export let asideClass = '';
</script>

<Sidebar asideClass={`${asideClass}`}>
	<SidebarWrapper class="h-full pt-6 px-6">
		<SidebarGroup ulClass="flex flex-col h-full gap-2">
			<SidebarItem label="Dashboard" href="/">
				<svelte:fragment slot="icon">
					<span class="material-icons-round"> home </span>
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem label="Tickets" {spanClass}>
				<svelte:fragment slot="icon">
					<span class="material-icons-round"> source </span>
				</svelte:fragment>
				<svelte:fragment slot="subtext">
					<!-- <span
						class="inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300"
						>Pro</span
					> -->
				</svelte:fragment>
			</SidebarItem>
			<SidebarFooter />
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
