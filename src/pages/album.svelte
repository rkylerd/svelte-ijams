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
    import { Link } from "svelte-routing";

    const { playSong, togglePlaying } = getContext(contextKey);

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

<main>
    <div class="album-songs">
        <section class="flex-row flex-wrap">
            {#if !loading}
                <img src={album.artworkUrl100} alt={"album artwork"} />
                <h3>
                    <Link to={`artist/${album.artistId}`}>{artistName}</Link>
                </h3>
                <h4>{albumName}</h4>

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
                                    <span class="explicitness">
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
        <hr />
    </div>
</main>

<style>
    .album-songs {
        position: relative;
        background-color: #eee;
        border-radius: 9px;
        min-width: 300px;
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
        background-color: #ffff93;
    }
</style>
