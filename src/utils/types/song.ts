export type Song = {
    trackName: string;
    artistName: string;
    artworkUrl100: string;
    trackTimeMillis: number;
    artistId: number;
    artistViewUrl: string;
    artworkUrl30: string;
    artworkUrl60: string;
    collectionCensoredName: string;
    collectionExplicitness: string;
    collectionId: number;
    collectionName: string;
    collectionPrice: number;
    collectionViewUrl: string;
    country: string;
    currency: string;
    discCount: number;
    discNumber: number;
    isStreamable: boolean;
    kind: string;
    previewUrl: string;
    primaryGenreName: string;
    releaseDate: string;
    trackCensoredName: string;
    trackCount: number;
    trackExplicitness: string;
    trackId: number;
    trackNumber: number;
    trackPrice: number;
    trackViewUrl: string;
    wrapperType: string;
    votes?: number;
};

export default Song;