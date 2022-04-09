<script lang="ts">
    import { onMount } from "svelte";
    import { getParams } from "../utils";
    import SongList from "../components/Song/List.svelte";
    import { useLocation } from "svelte-navigator";
    import { Jumper } from "svelte-loading-spinners";

    let songs = [];
    let loading = false;

    const refresh = async (isFirstLoad = false) => {
        const { q = isFirstLoad ? "john+mayer" : "" } = getParams({
            q: "string",
        });

        // Don't search when no q query parameter exists
        if (!q) return;

        loading = true;
        const res = await fetch(`api/song/${encodeURIComponent(q)}`);
        loading = false;
        if (res.ok) {
            const { results } = await res.json();
            songs = results;
        }
    };

    const location = useLocation();
    $: $location.search && refresh();
    $: searchTerm =
        $location.search &&
        (
            (getParams({
                q: "string",
            }).q as string) || ""
        )
            .split("+")
            .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
            .join(" ");

    onMount(async () => {
        await refresh(true);
    });
</script>

<svelte:head>
    <title>Search: {searchTerm}</title>
</svelte:head>

<main>
    {#if loading}
        <div class="loading-container">
            <Jumper size="40" color="#FF3E00" unit="px" />
            ...searching
        </div>
    {:else}
        <SongList {songs} />
    {/if}
</main>

<style>
    .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
