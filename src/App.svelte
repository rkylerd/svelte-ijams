<script lang="ts">
	import Router from "./pages/router.svelte";
	import AudioPlayer from "./components/AudioPlayer/index.svelte";
	import { setContext } from "svelte";
	import { makePlaySongFunction } from "./utils";
	import type Song from "./utils/types/song";
	import {
		soundData,
		defaultSoundData,
		contextKey,
		SoundData,
	} from "./store/soundData";

	const playNext = () => {
		let nextSong: Song | undefined;
		let newSoundData: SoundData | undefined;

		$soundData.audioPlayer?.pause();

		soundData.update((prev) => {
			nextSong = prev.upNext?.[0];
			newSoundData = {
				song: nextSong,
				isPlaying: false,
				upNext: prev.upNext.slice(1),
				currentTime: 0,
				audioPlayer: null,
			};
			return newSoundData;
		});

		playSong(nextSong);
	};

	const playSong = makePlaySongFunction({
		handlePlay: (song: Song, audioPlayer: HTMLAudioElement) => {
			soundData.update((prev) => ({
				...prev,
				isPlaying: true,
				song,
				audioPlayer,
				upNext: prev.upNext,
			}));
		},
		handlePause: () => {
			soundData.update((prev) => ({
				...prev,
				isPlaying: false,
			}));
		},
		isStoppingSong: (trackId: Song["trackId"]) => {
			let isTrackCurrentlyPlaying = false;

			if ($soundData.isPlaying) {
				$soundData.audioPlayer?.pause();
				isTrackCurrentlyPlaying = trackId === $soundData.song?.trackId;
			}

			if (isTrackCurrentlyPlaying) {
				soundData.update((prev) => ({
					...defaultSoundData,
					upNext: prev.upNext,
				}));
			}

			return isTrackCurrentlyPlaying;
		},
		handleTimeUpdate: ({
			currentTarget: { currentTime = 0 },
		}: any = {}) => {
			if ($soundData.isPlaying) {
				$soundData.currentTime = currentTime;
			}
		},
		handleSongEnded: playNext,
	});

	const togglePlaying = () => {
		soundData.update((prev) => {
			if (!prev.song) return prev;

			if (!prev.audioPlayer) {
				playSong(prev.song);
			} else if (prev.isPlaying) {
				prev.audioPlayer?.pause();
			} else {
				prev.audioPlayer?.play();
			}

			return {
				...prev,
				isPlaying: !prev.isPlaying,
			};
		});
	};

	const addToUpNext = (song: Song | Song[]) => {
		soundData.update((prev) => {
			const upNext = [...prev.upNext];
			Array.isArray(song) ? upNext.push(...song) : upNext.push(song);

			return {
				...prev,
				upNext,
			};
		});
	};

	setContext(contextKey, { playSong, addToUpNext, togglePlaying, playNext });
</script>

<main>
	<AudioPlayer />
	<Router />
</main>

<style>
	main {
		width: 100%;
	}
</style>
