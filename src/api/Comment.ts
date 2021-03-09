import { Award } from "./Award";

export type Comment = {
    id: string,
    body: string,
    subredditNamePrefixed: string,
    allAwardings: Award[];
};