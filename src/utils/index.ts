import type { Song } from "./types/song";

export type PlaySoundCallbacks = {
    isStoppingSong: (trackId: Song["trackId"]) => boolean,
    handleSongEnded: () => void,
    handlePause: () => void,
    handleTimeUpdate: (e: Event) => void,
    handlePlay: (song: Song, soundPlayer: HTMLAudioElement) => void,
};

export type PlaySoundFn = (song: Song) => void;

export const makePlaySongFunction = ({
    isStoppingSong,
    handleSongEnded,
    handlePause,
    handleTimeUpdate,
    handlePlay,
}: PlaySoundCallbacks) => (song: Song): void => {
    const { trackId = "", previewUrl = "" } = song || {};

    if (!trackId) {
        return;
    }

    if (isStoppingSong(trackId)) {
        return;
    }

    let audioPlayer = new Audio(previewUrl);

    audioPlayer.addEventListener('timeupdate', handleTimeUpdate);

    audioPlayer.addEventListener('pause', handlePause);

    audioPlayer.addEventListener('ended', handleSongEnded);

    // on play, swap the play icon for a stop icon
    audioPlayer.addEventListener('play', () => handlePlay(song, audioPlayer));

    audioPlayer.play();
};

export const millisToMinutesAndSeconds = (millis: number) => {
    const totalSeconds = millis / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return {
        seconds: totalSeconds,
        timeStr: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    };
}

type KeyDownData = {
    keys?: string[];
    params?: any[];
    callback: (...params: any[]) => Promise<void>;
    options?: {
        stopPropagation?: boolean;
        preventDefault?: boolean;
    }
}

export const handleKeyPress = ({
    keys = [" ", "enter"],
    params = [],
    callback,
    options = {}
}: KeyDownData) => async (event: KeyboardEvent) => {
    if (keys.includes(event.key.toLowerCase())) {
        const { stopPropagation = true, preventDefault = true } = options;
        // Prevents space button from scrolling, for example.
        preventDefault && event.preventDefault();
        // Stops on:keydown event from firing on parent elements
        stopPropagation && event.stopPropagation();

        await callback(...params);
    }
};

const getUrl = () => window.location;
export const getParams = (expected: Record<string, "number" | "boolean" | "string">) => {
    const params = new URLSearchParams(getUrl().search);

    return Object.entries(expected).reduce((acc, [key, type]) => {
        const paramValue = params.get(key);
        if (!paramValue) return acc;

        switch (type) {
            case 'boolean': {
                switch (paramValue) {
                    case 'true':
                        acc[key] = true;
                        break;
                    case 'false':
                        acc[key] = false;
                        break;
                    default:
                        return acc;
                }
            }
            case 'number': {
                const numbersOnly = paramValue.replace(/[^0-9]/g, "");
                const value = numbersOnly ? parseInt(numbersOnly) : null;
                acc[key] = value;
                break;
            }
            case 'string': {
                acc[key] = paramValue;
                break;
            }
            default:
            // Do nothing and return acc below.
        }

        return acc;
    }, {} as Record<string, string | number | boolean>);

};

export const formatExplicitness = (rawExplcitness: string) => {
    const lowerCase = rawExplcitness.toLowerCase();
    if (lowerCase === "notexplicit") {
        return {
            firstCharacter: "",
            lowerCase: "",
        };
    }

    return {
        firstCharacter: rawExplcitness
            .charAt(0)
            .toUpperCase(),
        lowerCase,
    };
}