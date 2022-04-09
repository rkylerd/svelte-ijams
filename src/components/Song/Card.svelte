<script lang="ts">
    import { play, stop } from "./song-images";
    import { getContext } from "svelte";

    import { Link } from "svelte-navigator";

    import { soundData, contextKey } from "../../store/soundData";
    import type Song from "../../utils/types/song";
    import { handleKeyPress } from "../../utils";

    export let song: Song;
    const { playSong } = getContext(contextKey);

    let hovered = false;
    $: playingImage =
        $soundData.isPlaying && $soundData.song?.trackId === song.trackId
            ? stop
            : hovered
            ? play
            : "";

    let artworkBackground = `background-image: url(${song.artworkUrl100});`;

    const mouseEnter = () => (hovered = true);
    const mouseLeave = () => (hovered = false);
</script>

<div class="card">
    <div class="card-actions">
        <div
            class="album-artwork"
            style={artworkBackground}
            on:mouseenter={mouseEnter}
            on:mouseleave={mouseLeave}
            on:focus={mouseEnter}
            on:blur={mouseLeave}
            on:click={() => playSong(song)}
            on:keydown={handleKeyPress({ callback: playSong, params: [song] })}
            tabindex={0}
        >
            {#if playingImage !== ""}
                <img
                    src={playingImage}
                    class={`playing-indicator ${
                        playingImage === play ? "" : "stop"
                    }`}
                    alt="play icon"
                    style="display: block;"
                />
            {/if}
        </div>

        <slot />
    </div>

    <div class="details">
        <span
            ><strong
                ><Link
                    tabindex={0}
                    to={`/album/${song.collectionId}?highlight=${song.trackId}`}
                    >{song.trackName}</Link
                ></strong
            ></span
        >
        <span
            ><Link tabindex={0} to={`/artist/${song.artistId}`}
                >{song.artistName}</Link
            ></span
        >
    </div>
</div>

<style>
    .card-actions {
        display: flex;
        justify-content: space-between;
    }
    .playing-indicator {
        margin: auto;
        width: 40px;
        height: 40px;
    }

    .stop {
        width: 35px;
        height: 35px;
    }

    .album-artwork {
        background: no-repeat;
        background-size: contain;
        height: 60px;
        width: 60px;
        min-width: 60px;
        display: flex;
    }

    .card {
        border-top: 1px solid #292b2c;
        border-right: 1px solid #292b2c;
        width: 180px;
        padding: 5px;
        height: 112px;
    }

    .details {
        /* max-width: 122px; */
        padding-left: 3px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        overflow: hidden;
    }

    .details span {
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
    }
</style>
