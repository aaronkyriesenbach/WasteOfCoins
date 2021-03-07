import { Award } from "./Award";

export type Post = {
    id: string,
    title: string,
    subredditNamePrefixed: string,
    allAwardings: Award[];
};