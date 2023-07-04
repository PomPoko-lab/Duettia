<script lang="ts">
	export let jsonData: unknown;

	export let preClass: string = '';
</script>

<pre class="bg-gray-800 text-gray-200 rounded p-4 {preClass}">
    {JSON.stringify(jsonData, null, 2)}
</pre>
