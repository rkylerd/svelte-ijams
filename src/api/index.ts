export const getArtistAlbums = async (artistId: string) => {
    const res = await fetch(`api/artistalbums/${artistId}`);
    const { results = [] } = await res.json();

    return results.filter(({ wrapperType }) => wrapperType === "collection");
};

export const getAlbum = async (albumId: string | number) => {
    const res = await fetch(`api/album/${albumId}`);
    const { results } = await res.json();
    const indexOfAlbumInfo = results.findIndex(({ wrapperType }) => wrapperType !== "track")
    const album = {
        ...results[indexOfAlbumInfo],
        songs: [
            ...results.slice(0, indexOfAlbumInfo),
            ...results.slice(indexOfAlbumInfo + 1),
        ]
    };
    return album;
};