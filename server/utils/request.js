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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const axios_1 = __importDefault(require("axios"));
const promise_retry_1 = __importDefault(require("promise-retry"));
const defaultHeaders = {
    "content-type": "application/json",
};
const retryConfig = {
    retries: 6,
    factor: 1,
    minTimeout: 500,
    maxTimeout: 1000,
    randomize: false,
};
const request = (method) => (res, url, data = {}, extraHeaders = {}) => __awaiter(void 0, void 0, void 0, function* () {
    promise_retry_1.default(retryConfig, (retry) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data: response } = yield axios_1.default(Object.assign({ method,
                url, headers: Object.assign(Object.assign({}, defaultHeaders), extraHeaders) }, ["POST", "PATCH"].includes(method) ? { data } : {}));
            res.json(response);
        }
        catch (error) {
            retry(error);
        }
    })).catch(err => {
        console.log("--------", err, "--------");
        res.sendStatus(500);
    });
});
exports.GET = request("GET");
