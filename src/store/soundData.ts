import { Writable, writable } from 'svelte/store';
import type { Song } from '../utils/types/song';

export type SoundData = {
    isPlaying: boolean;
    song?: Song;
    audioPlayer: HTMLAudioElement | null;
    currentTime: number;
    upNext: Song[];
};

export const defaultSoundData = {
    isPlaying: false,
    song: undefined,
    audioPlayer: null,
    currentTime: 0,
    upNext: [],
};

export const contextKey = Symbol();

export const soundData: Writable<SoundData> = writable(defaultSoundData);