import { Award } from './Award';
import { Post } from './Post';

export const mapAward = (award: any): Award => {
    return {
        id: award.id,
        coinPrice: award.coin_price,
        count: award.count,
        iconUrl: award.icon_url,
        name: award.name,
        description: award.description
    };
};

export const mapPost = (post: any): Post => {
    return {
        id: post.id,
        title: post.title,
        subredditNamePrefixed: post.subredditNamePrefixed,
        allAwardings: post.all_awardings.map(mapAward)
    };
};