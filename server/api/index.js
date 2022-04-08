"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const request_1 = require("../utils/request");
const getApi = () => {
    const router = express_1.Router();
    const itunesApi = "https://itunes.apple.com/", searchEndpoint = "search?term=", lookupEndpoint = "lookup?id=", songEntity = "&entity=song", albumEntity = "&entity=album", limit = "&limit=200";
    router.get('/song/:q', function (req, res) {
        request_1.GET(res, `${itunesApi}${searchEndpoint}${req.params.q}${songEntity}${limit}`);
    });
    router.get('/mvideo/:q', function (req, res) {
        request_1.GET(res, `${itunesApi}${searchEndpoint}${req.params.q}&entity=musicVideo`);
    });
    router.get('/album/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        request_1.GET(res, `${itunesApi}${lookupEndpoint}${req.params.id}${songEntity}${limit}`);
    }));
    router.get('/artist/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        request_1.GET(res, `${itunesApi}${lookupEndpoint}${req.params.id}${songEntity}${limit}`);
    }));
    router.get('/artistalbums/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        request_1.GET(res, `${itunesApi}${lookupEndpoint}${req.params.id}${albumEntity}`);
    }));
    return router;
};
exports.default = getApi;
