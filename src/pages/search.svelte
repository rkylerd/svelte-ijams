<script lang="ts">
    import { onMount } from "svelte";
    import { getParams } from "../utils";
    import List from "../components/Song/List.svelte";

    let songs = [];
    let loading = false;
    const refresh = async (e) => {
        if (loading) return;
        console.log(getParams({ q: "string" }));

        const { q = "john+mayer" } = getParams({ q: "string" });
        loading = true;
        const res = await fetch(`api/song/${encodeURIComponent(q)}`);
        loading = false;
        if (res.ok) {
            const { results } = await res.json();
            songs = results;
        }
    };

    onMount(async () => {
        window.addEventListener("change", refresh);
        await refresh();
    });
</script>

<main>
    <List {songs} />
</main>

<style>
</style>
