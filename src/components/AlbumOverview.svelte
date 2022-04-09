<script lang="ts">
    import { contextKey, soundData } from "../store/soundData";
    import {
        formatExplicitness,
        handleKeyPress,
        millisToMinutesAndSeconds,
    } from "../utils";
    import type Song from "../utils/types/song";
    import { stop, play } from "./Song/song-images";
    import { getContext } from "svelte";

    export let songs: Song[];

    const { playSong } = getContext(contextKey);

    let hoveredIdx: number = -1;
    let explicitness = (song: Song) =>
        formatExplicitness(song.trackExplicitness);

    let setHoveredIdx = (idx: number) => (hoveredIdx = idx);
</script>

<div class="album-songs-wrapper" on:mouseleave={() => setHoveredIdx(-1)}>
    <div class="album-songs">
        <div class="caret" />
        <ul>
            {#each songs as song, idx (song.trackId)}
                <li
                    tabindex={0}
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
                                on:click={() => playSong(song)}
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
                        class={`track-explicitness ${
                            formatExplicitness(song.trackExplicitness).lowerCase
                        }`}
                    >
                        {formatExplicitness(song.trackExplicitness)
                            .firstCharacter}
                    </span>
                    <span class="track-length">
                        {millisToMinutesAndSeconds(song.trackTimeMillis)
                            .timeStr}
                    </span>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    .album-songs-wrapper {
        position: relative;
    }
    .album-songs {
        position: absolute;
        background-color: #eee;
        z-index: 15;
        border-radius: 9px;
        min-width: 300px;
        max-width: 315px;
        box-shadow: 0 2px 5px;
        top: 10px;
        left: -5px;
    }

    .album-songs ul {
        padding: 5px;
        list-style: none;
        z-index: 10; /* more than the caret */
    }
    .album-songs ul li {
        display: grid;
        font-size: 14px;
        grid-template-columns: 20px minmax(auto, 90%) 15px 30px;
        border-bottom: 1px solid #eff;
        width: 100%;
    }

    .album-songs ul li img {
        width: 20px;
        height: 20px;
    }

    .album-songs ul li:last-of-type {
        border-bottom: none;
    }

    .album-songs ul li .track-length {
        text-align: right;
    }

    .track-num img {
        display: block;
        width: 100%;
        height: 100%;
        margin-left: -4px;
    }

    .caret {
        position: absolute;
        top: -14px;
        left: 15px;
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: solid #eee 15px;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
    }
</style>
