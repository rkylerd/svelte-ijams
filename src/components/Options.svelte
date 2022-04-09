<script lang="ts">
    import { clickOutside } from "../utils/click-outside";
    import FaEllipsisH from "svelte-icons/fa/FaEllipsisH.svelte";

    export let id;
    const blur = () => {
        focused = false;
    };
    let focused = false;
    const focus = () => !focused && (focused = true);
</script>

<div id={`${id}-options`} class="options-container" on:click={focus}>
    <div class="options-visible">
        <div class="ellipsis">
            <FaEllipsisH />
        </div>
    </div>
    {#if focused}
        <ul class="options" use:clickOutside on:click_outside={blur}>
            <slot />
        </ul>
    {/if}
</div>

<style>
    .options-container {
        position: relative;
    }
    .options-visible {
        width: 17px;
        height: 17px;
        border-radius: 4px;
        background-color: #f7f7f7;
        border: 1px solid;
        justify-content: center;
        display: flex;
    }
    .ellipsis {
        width: 12px;
        display: flex;
    }

    .options {
        position: absolute;
        bottom: 9px;
        border-radius: 4px;
        padding: 0;
        background-color: #f7f7f7;
        left: 0;
        width: max-content;
        font-size: 12px;
        list-style: none;
        border: 1px solid;
        cursor: pointer;
        -webkit-box-shadow: 0 0 4px 1px #1f2b38;
        box-shadow: 0 0 4px 1px #1f2b38;
    }
</style>
