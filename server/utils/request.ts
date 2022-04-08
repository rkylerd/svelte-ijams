import axios, { AxiosResponse } from "axios";
import promiseRetry from "promise-retry";
import { Response } from "express";

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

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
const request = (method: Method) => async (res: Response, url: string, data: Record<string, any> = {}, extraHeaders: Record<string, any> = {}) => {
    promiseRetry(retryConfig, async (retry) => {
        try {
            const { data: response }: AxiosResponse<any> = await axios({
                method,
                url,
                headers: {
                    ...defaultHeaders,
                    ...extraHeaders,
                },
                ...["POST", "PATCH"].includes(method) ? { data } : {}
            });

            res.json(response);
        } catch (error: any) {
            retry(error);
        }
    }).catch(err => {
        console.log("--------", err, "--------");
        res.sendStatus(500);
    });
};

export const GET = request("GET");
