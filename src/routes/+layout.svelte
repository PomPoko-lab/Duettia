<script lang="ts">
	import '../app.postcss';
	import '../app.css';

	import SideBar from '$lib/components/SideBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="grid grid-cols-12 grid-rows-12 p-6 gap-4 h-screen">
	<SideBar asideClass="col-span-2 row-span-11" />
	<main class="col-span-10 overflow-y-auto row-span-11 px-4 pr-8">
		<slot />
	</main>
	<Footer footerClass="col-span-full self-end h-1/6" />
</div>
