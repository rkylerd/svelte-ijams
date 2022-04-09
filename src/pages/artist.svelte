<script lang="ts">
    import { onMount } from "svelte";
    import AlbumView from "../components/AlbumView.svelte";
    import { getArtistAlbums } from "../api";
    import type AlbumCollection from "../utils/types/album-collection";
    export let artistId: string;

    let albums: Array<AlbumCollection> = [];
    let loading = true;
    let indexOfFocusedAlbum: number = -1;
    $: artistName = albums?.[0]?.artistName || "Artist Name";

    const handleAlbumClick = (idx: number) => (indexOfFocusedAlbum = idx);

    onMount(async () => {
        albums = await getArtistAlbums(artistId);
        loading = false;
    });
</script>

<svelte:head>
    <title>Artist: {artistName}</title>
</svelte:head>

<main>
    <div>
        <section class="flex-row flex-wrap">
            {#if !loading}
                <h3 style="margin-top: 2%; margin-left: 5%;">{artistName}</h3>
                <div class="flex-col-wrap">
                    {#each albums as album, idx (album.collectionId)}
                        <AlbumView
                            {album}
                            hasFocus={idx === indexOfFocusedAlbum}
                            onFocus={(newIdx = undefined) => {
                                handleAlbumClick(
                                    newIdx === undefined ? idx : newIdx
                                );
                            }}
                        />
                    {/each}
                </div>
            {/if}
        </section>
    </div>
</main>

<style>
    .flex-col-wrap {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
    }
</style>
