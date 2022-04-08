<script lang="ts">
    import { onMount } from "svelte";
    import { getParams } from "../utils";
    import SongList from "../components/Song/List.svelte";

    let songs = [];
    let loading = false;
    const refresh = async () => {
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
    <SongList {songs} />
</main>

<style>
</style>
