import axios, { AxiosInstance, AxiosPromise } from 'axios';

export default class RedditApi {
    api: AxiosInstance;

    constructor() {
        this.api = axios.create();
    }

    public getUrl(url: string): AxiosPromise {
        return this.api.get(`${url}.json`);
    }
}