<script lang="ts">
    import { onMount } from "svelte";
    import { getAlbum } from "../api";
    import {
        handleKeyPress,
        millisToMinutesAndSeconds,
        getParams,
        formatExplicitness,
    } from "../utils";
    import { stop, play } from "../components/Song/song-images";
    import { getContext } from "svelte";
    import { contextKey, soundData } from "../store/soundData";
    import type AlbumCollection from "../utils/types/album-collection";
    import { Link } from "svelte-navigator";

    const { playSong, addToUpNext, togglePlaying } = getContext(contextKey);

    let hoveredIdx: number = -1;
    const setHoveredIdx = (idx: number) => (hoveredIdx = idx);
    export let collectionId: string;

    const { highlight: highlightedSongId } = getParams({ highlight: "number" });
    let album: undefined | AlbumCollection;

    let loading = true;
    $: artistName = album?.artistName || "Artist Name";
    $: albumName = album?.collectionName || "Album Name";

    onMount(async () => {
        album = await getAlbum(collectionId);
        loading = false;
    });
</script>

<svelte:head>
    <title>Album: {album?.collectionName}</title>
</svelte:head>
<main>
    <div class="album-songs">
        <section>
            {#if !loading}
                <div class="album-header">
                    <img src={album.artworkUrl100} alt={"album artwork"} />
                    <div>
                        <h3>
                            <Link to={`/artist/${album.artistId}`}
                                >{artistName}</Link
                            >
                        </h3>
                        <h4>{albumName}</h4>
                    </div>
                </div>

                <div class="container-normal">
                    <ul on:mouseleave={() => setHoveredIdx(-1)}>
                        {#each album.songs as song, idx (song.trackId)}
                            {#if song.wrapperType === "track"}
                                <li
                                    tabindex={0}
                                    class={`${
                                        highlightedSongId === song.trackId
                                            ? "highlighted"
                                            : ""
                                    }`}
                                    on:mouseenter={() => setHoveredIdx(idx)}
                                    on:focus={() => setHoveredIdx(idx)}
                                    on:keypress={handleKeyPress({
                                        callback: playSong,
                                        params: [song],
                                    })}
                                >
                                    <span class="track-num"
                                        >{#if $soundData.isPlaying && $soundData.song?.trackId === song.trackId}
                                            <img
                                                src={stop}
                                                alt="Stop"
                                                on:click={togglePlaying}
                                            />
                                        {:else if idx === hoveredIdx}
                                            <img
                                                src={play}
                                                alt="Play"
                                                on:click={() => playSong(song)}
                                            />
                                        {:else}
                                            {song.trackNumber}
                                        {/if}
                                    </span>
                                    <span class="track-name">
                                        {song.trackName}
                                    </span>
                                    <span
                                        class={`explicitness ${
                                            formatExplicitness(
                                                song.trackExplicitness
                                            ).lowerCase
                                        }`}
                                    >
                                        {formatExplicitness(
                                            song.trackExplicitness
                                        ).firstCharacter}
                                    </span>
                                    <span class="track-length">
                                        {millisToMinutesAndSeconds(
                                            song.trackTimeMillis
                                        ).timeStr}
                                    </span>
                                </li>
                            {/if}
                        {/each}
                    </ul>
                </div>
            {/if}
        </section>
        {#if album?.songs.length}
            <hr />
            <div class="preview-all">
                <img
                    src={play}
                    alt="Play"
                    on:click={() => {
                        playSong(album.songs[0]);
                        addToUpNext(album.songs.slice(1));
                    }}
                />
                <span> Preview all </span>
            </div>
        {/if}
    </div>
</main>

<style>
    main {
        background-color: #f7f7f7;
    }
    .album-header {
        display: flex;
    }

    .album-header > img {
        width: 100px;
        height: 100px;
    }

    .album-header > div {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
    }

    .album-header > div > h3 {
        margin-bottom: 0px;
    }

    .album-songs {
        position: relative;
        border-radius: 9px;
        min-width: 300px;
        padding: 10px;
        /* -webkit-box-shadow: 0 0 4px 1px #1f2b38;
        box-shadow: 0 0 2px #1f2b38; */
    }

    .album-songs ul {
        padding: 0px 5px;
        list-style: none;
    }
    .album-songs ul li {
        display: grid;
        font-size: 14px;
        min-height: 21px;
        grid-template-columns: 30px minmax(auto, 90%) 20px 30px;
        border-bottom: 1px solid #eff;
        width: 100%;
    }

    .album-songs ul li .track-length {
        text-align: right;
    }

    .track-num img {
        display: block;
        width: 20px;
        height: 20px;
        margin-left: -4px;
    }

    .highlighted {
        background-color: beige;
    }

    .preview-all {
        display: flex;
        align-items: center;
        font-size: 12px;
    }

    .preview-all > img {
        width: 20px;
        height: auto;
    }
</style>
