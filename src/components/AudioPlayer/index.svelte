<script lang="ts">
    import { getContext } from "svelte";
    import FaPauseCircle from "svelte-icons/fa/FaPauseCircle.svelte";
    import FaCaretRight from "svelte-icons/fa/FaCaretRight.svelte";
    import FaCaretLeft from "svelte-icons/fa/FaCaretLeft.svelte";
    import FaStepBackward from "svelte-icons/fa/FaStepBackward.svelte";
    import FaStepForward from "svelte-icons/fa/FaStepForward.svelte";
    import FaPlayCircle from "svelte-icons/fa/FaPlayCircle.svelte";
    import Slider from "./slider.svelte";

    import { contextKey, soundData } from "../../store/soundData";

    const { playNext, togglePlaying } = getContext(contextKey);
    const updateTime = ({ currentTarget: { value = "0" } = {} }) => {
        if (!$soundData.song) return;

        $soundData.audioPlayer &&
            ($soundData.audioPlayer.currentTime = parseInt(value));
    };

    const resetSong = () => {
        $soundData.audioPlayer.currentTime = 0;
    };

    let visible = !!$soundData.song?.trackId;
    const toggleVisibility = () => {
        visible = !visible;
    };
</script>

<div id="music-player-container" class={visible ? "" : "hidden"}>
    <div id="music-player">
        <button id="caret" on:click={toggleVisibility}>
            {#if visible}
                <FaCaretRight />
            {:else}
                <FaCaretLeft />
            {/if}
        </button>
        <div id="buttons">
            <button
                class="sm-button"
                disabled={!(
                    $soundData.audioPlayer && $soundData.currentTime > 0
                )}
                on:click={resetSong}
            >
                <div>
                    <FaStepBackward />
                </div>
            </button>
            <button on:click={togglePlaying} disabled={!$soundData.song}>
                {#if $soundData.isPlaying}
                    <FaPauseCircle />
                {:else}
                    <FaPlayCircle />
                {/if}
            </button>
            <button
                class="sm-button"
                on:click={playNext}
                disabled={!$soundData.upNext.length}
            >
                <div>
                    <FaStepForward />
                </div>
            </button>
        </div>

        <Slider
            {updateTime}
            value={Math.floor($soundData.currentTime || 0)}
            disabled={!$soundData.audioPlayer}
        >
            {#if $soundData.song}
                <div id="current-song-info">
                    {$soundData.song?.trackName} - {$soundData.song?.artistName}
                </div>
            {/if}
        </Slider>
    </div>
</div>

<style>
    #current-song-info {
        top: 0.5em;
        left: 2em;
        right: 2em;
        position: absolute;
        height: 1.2em;
        font-size: 1em;
        line-height: 1em;
        overflow: hidden;
    }

    #music-player-container {
        position: fixed;
        right: 0;
        overflow: hidden;
        z-index: 20;
        transition: width 0.3s;
    }

    @media (max-width: 1600px) {
        #music-player-container {
            width: 50vw;
        }
        #current-song-info {
            left: 2.25em;
        }
    }

    @media (max-width: 1024px) {
        #music-player-container {
            width: 90vw;
        }
    }

    #music-player-container.hidden {
        width: 35px;
    }

    #music-player {
        display: flex;
        transition: width 0.3s;
        border-left: solid 0.25em #292b2c;
        border-bottom: solid 0.25em #292b2c;
        background-color: rgb(247, 247, 247);
    }

    @media (max-width: 1024px) {
        #music-player {
            border-bottom-right-radius: 2px;
            width: 90vw;
        }
    }

    #music-player > * {
        margin: auto 0;
    }

    #buttons {
        display: flex;
    }

    #music-player > div#buttons > * {
        margin: auto 0.1em;
        display: flex;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: 50%;
        background-color: rgb(247, 247, 247);
        cursor: pointer;
        transition: box-shadow 0.3s;
        align-items: center;
    }

    #music-player > div#buttons > .sm-button > * {
        display: flex;
    }

    #music-player > div#buttons > :nth-child(2) {
        width: 2.5em;
        height: 2.5em;
    }

    #music-player > div#buttons > :hover:not(:disabled) {
        -webkit-box-shadow: 0 0 4px 1px #1f2b38;
        box-shadow: 0 0 4px 1px #1f2b38;
    }

    #caret {
        background-color: #292b2c;
        color: rgb(247, 247, 247);
        margin: auto 0.1em auto 0;
        min-width: 30px;
        height: 2em;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        cursor: pointer;
        transition: box-shadow 0.3s;
        display: flex;
    }

    @media (max-width: 1600px) {
        #music-player {
            border-bottom-left-radius: 8px;
            min-height: 3em;
        }
    }
</style>
