import { Router } from "express";
import { GET } from "../utils/request";

const getApi = () => {
    const router = Router();

    const itunesApi = "https://itunes.apple.com/",
        searchEndpoint = "search?term=",
        lookupEndpoint = "lookup?id=",
        songEntity = "&entity=song",
        albumEntity = "&entity=album",
        limit = "&limit=200";

    router.get('/song/:q', function (req, res) {
        GET(
            res,
            `${itunesApi}${searchEndpoint}${req.params.q}${songEntity}${limit}`
        );
    });

    router.get('/mvideo/:q', function (req, res) {
        GET(
            res,
            `${itunesApi}${searchEndpoint}${req.params.q}&entity=musicVideo`
        );
    });

    router.get('/album/:id', async (req, res) => {
        GET(
            res,
            `${itunesApi}${lookupEndpoint}${req.params.id}${songEntity}${limit}`
        );
    });

    router.get('/artist/:id', async (req, res) => {
        GET(
            res,
            `${itunesApi}${lookupEndpoint}${req.params.id}${songEntity}${limit}`
        );
    });

    router.get('/artistalbums/:id', async (req, res) => {
        GET(
            res,
            `${itunesApi}${lookupEndpoint}${req.params.id}${albumEntity}`
        );
    });

    return router;
};

export default getApi;