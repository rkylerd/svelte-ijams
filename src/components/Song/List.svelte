<script lang="ts">
    import Card from "./Card.svelte";

    export let songs = [];
</script>

<!-- <div class="wrapper"> -->
<div class="inner-wrapper">
    {#each songs as song (song.trackId)}
        <Card {song} />
    {/each}
</div>

<!-- </div> -->
<style>
    /* .wrapper {
        display: flex;
        margin: unset auto;
        flex-direction: row;
        height: 505px;
    } */

    .inner-wrapper {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
    }
</style>
