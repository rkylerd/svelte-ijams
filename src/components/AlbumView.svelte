<script lang="ts">
    import { contextKey, soundData } from "../store/soundData";
    import { Jumper } from "svelte-loading-spinners";

    import type AlbumCollection from "../utils/types/album-collection";
    import { play, stop } from "./Song/song-images";
    import { getContext, onMount } from "svelte";
    import type Song from "../utils/types/song";
    import { getAlbum } from "../api";
    import AlbumOverview from "./AlbumOverview.svelte";
    import { formatExplicitness, handleKeyPress } from "../utils";
    import { Link } from "svelte-routing";

    export let album: AlbumCollection;
    export let hasFocus: boolean = false;
    export let onFocus: (idx?: number) => void = () => null;

    let hovered = false,
        loading = false,
        songs: Song[] = [];

    const mouseEnter = () => (hovered = true);
    const mouseLeave = () => (hovered = false);
    const { playSong, addToUpNext } = getContext(contextKey);

    const playAlbum = () => {
        const [firstSong, ...otherSongs] = songs;
        playSong(firstSong);
        addToUpNext(otherSongs);
    };

    const toggleShowingAlbum = (cb: () => Promise<void>) => async () => {
        if (hasFocus) {
            onFocus(-1);
            return;
        }

        onFocus();
        await cb();
    };

    const getSongs = async () => {
        if (songs.length) {
            // Do nothing; already retrieved this album's songs.
            return;
        }

        loading = true;
        const { songs: albumSongs } = await getAlbum(album.collectionId);
        loading = false;
        songs = albumSongs.sort((a, b) =>
            a.trackNumber === b.trackNumber
                ? 0
                : a.trackNumber < b.trackNumber
                ? -1
                : 1
        );
    };

    const getAndPlayAlbum = async () => {
        await getSongs();
        playAlbum();
    };

    let explicitness = formatExplicitness(album.collectionExplicitness);
    $: containsPlayingSong =
        $soundData.isPlaying &&
        songs.some(({ trackId }) => trackId === $soundData.song?.trackId);

    onMount(async () => {
        if (
            $soundData.isPlaying &&
            $soundData.song?.collectionId === album.collectionId
        ) {
            await getSongs();
        }
    });
</script>

<div>
    <div class="album">
        <div class="flex-row">
            <div
                class="album-art"
                on:mouseenter={mouseEnter}
                on:mouseleave={mouseLeave}
                on:click={toggleShowingAlbum(getSongs)}
                tabindex={0}
                on:keypress={handleKeyPress({
                    callback: toggleShowingAlbum(getSongs),
                })}
            >
                <img
                    src={album.artworkUrl100}
                    alt={album.collectionCensoredName}
                    on:focus={mouseEnter}
                    tabindex={containsPlayingSong ? -1 : 0}
                    on:keypress={handleKeyPress({
                        callback: async () => {
                            if (!containsPlayingSong) {
                                getAndPlayAlbum();
                            }
                        },
                    })}
                />
                {#if containsPlayingSong}
                    <img
                        class="album-icon"
                        src={stop}
                        tabindex={0}
                        alt="stop playing album"
                        on:click={(e) => {
                            e.stopPropagation();
                            if (!hasFocus) {
                                onFocus();
                            }
                            playSong($soundData.song);
                        }}
                        on:keypress={handleKeyPress({
                            callback: playSong,
                            params: [$soundData.song],
                        })}
                    />
                {:else if hovered}
                    <img
                        class="album-icon"
                        src={play}
                        alt="play album"
                        on:click={(e) => {
                            e.stopPropagation();
                            if (!hasFocus) {
                                onFocus();
                            }
                            getAndPlayAlbum();
                        }}
                    />
                {/if}
                {#if loading}
                    <div class="loading">
                        <Jumper
                            size="20"
                            color="#FF3E00"
                            unit="px"
                            duration="1s"
                        />
                    </div>
                {/if}
            </div>
            <div class="flex-col">
                {#if explicitness.firstCharacter}
                    <span
                        class={`${explicitness.lowerCase} explicitness-container`}
                        >{explicitness.firstCharacter}</span
                    >
                {/if}
            </div>
        </div>

        <div class="song-info">
            <span class="song-name small-font link">
                <strong>
                    <Link to={`album/${album.collectionId}`}>
                        {album.collectionCensoredName}
                    </Link>
                </strong>
            </span>
        </div>
    </div>
    {#if hasFocus && songs.length}
        <AlbumOverview {songs} />
    {/if}
</div>

<style>
    .album {
        display: flex;
        flex-direction: column;
        width: 150px;
    }

    .flex-row {
        display: flex;
    }

    .flex-col {
        display: flex;
        flex-direction: column;
    }

    .album-art {
        position: relative;
        height: 100px;
        width: 100px;
        box-shadow: black 0 1px 3px;
    }

    .album-icon {
        position: absolute;
        left: 5px;
        bottom: 5px;
        width: 30px;
        height: 30px;
    }
    .loading {
        position: absolute;
        right: 15px;
        bottom: 15px;
        width: 5px;
        height: 5px;
    }

    .song-info {
        display: flex;
        justify-content: space-between;
    }

    .song-name {
        width: 150px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .explicitness-container {
        border-width: 0.5px;
        border-style: solid;
        width: 9px;
        font-size: 12px;
        padding: 0 4px;
        text-align: center;
        align-self: center;
        margin-left: 5px;
    }

    .cleaned {
        border-color: silver;
        color: silver;
    }

    .explicit {
        border-color: red;
        color: red;
    }

    .album-songs {
        background-color: #eee;
        border-radius: 9px;
        min-width: 300px;
    }
</style>
