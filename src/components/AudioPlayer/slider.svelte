<script lang="ts">
    import { millisToMinutesAndSeconds } from "../../utils";

    export let min = 0;
    export let max = 30;
    export let value: number;
    export let disabled: boolean;
    export let updateTime: (e: {
        currentTarget: { value: string };
    }) => void = () => null;
</script>

<div id="slider">
    <span>
        {millisToMinutesAndSeconds(value * 1000).timeStr}
    </span>
    <slot id="slot" />
    <input type="range" {disabled} {value} {min} {max} on:change={updateTime} />
    <span>0:30</span>
</div>

<style>
    #slot {
        position: absolute;
        background-color: pink;
    }
    #slider {
        position: relative;
    }
    #slider > span {
        font-size: small;
        margin: 4px;
        align-self: center;
    }
    @media (max-width: 1024px) {
        #slider > span {
            font-size: x-small;
        }
    }
    @media (max-width: 1600px) {
        #slider {
            display: flex;
            width: 100%;
        }
    }

    input[type="range"] {
        width: 100%;
        flex-grow: 1;
        margin: auto 0.5em;
        margin: 6.6px 0;
        -webkit-appearance: none;
        padding: 2em 0.4em;
        padding-bottom: 0.5em;
    }
    input[type="range"]:focus {
        outline: none;
    }
    input[type="range"]::-webkit-slider-runnable-track {
        background: #999999;
        border-radius: 1.3px;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }
    input[type="range"]::-webkit-slider-thumb {
        margin-top: -6.8px;
        width: 6px;
        height: 17px;
        background: #999999;
        border-radius: 2px;
        cursor: pointer;
        -webkit-appearance: none;
    }
    input[type="range"]:not(:disabled)::-webkit-slider-runnable-track,
    input[type="range"]:not(:disabled)::-webkit-slider-thumb {
        background: #292b2c;
    }

    input[type="range"]:not(:disabled)::-moz-range-track {
        background: #292b2c;
        border-radius: 1.3px;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }
    input[type="range"]:not(:disabled)::-moz-range-thumb {
        width: 6px;
        height: 17px;
        background: #292b2c;
        cursor: pointer;
    }
    input[type="range"]::-ms-track {
        background: transparent;
        border-color: transparent;
        border-width: 18.4px 0;
        color: transparent;
        width: 100%;
        height: 3.8px;
        cursor: pointer;
    }

    input[type="range"]:not(:disabled)::-ms-thumb {
        width: 6px;
        height: 17px;
        background: #292b2c;
        border-radius: 22px;
        cursor: pointer;
        margin-top: 0px;
        /*Needed to keep the Edge thumb centred*/
    }
</style>
