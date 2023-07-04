<script lang="ts">
	import { Footer, FooterCopyright, FooterLinkGroup } from 'flowbite-svelte';

	const year = new Date().getFullYear();
</script>

<Footer class="col-span-full self-end h-1/6">
	<FooterCopyright href="/" by="Duettia" {year} />
</Footer>
