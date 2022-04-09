<script lang="ts">
    import Options from "../Options.svelte";
    import Card from "./Card.svelte";
    import { getContext } from "svelte";
    import { contextKey, soundData } from "../../store/soundData";

    const { playSong, addToUpNext } = getContext(contextKey);
    export let songs = [];
</script>

<div class="inner-wrapper">
    {#each songs as song (song.trackId)}
        <Card {song}>
            <Options id={song.trackId}>
                <li on:click={() => addToUpNext(song)}>Add to up next</li>
            </Options>
        </Card>
    {/each}
</div>

<style>
    .inner-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
    }

    li {
        padding: 0 5px;
    }
    li:hover {
        background-color: #292b2c;
        color: #f7f7f7;
    }
</style>
