import React from 'react';
import { Award } from '../api/Award';
import { Post } from '../api/Post';
import './_styles.scss';

export default class Results extends React.Component<Props, {}> {
    getTotalAwards = () => {
        const { post } = this.props;

        return post.allAwardings
            .reduce((acc, curr) => acc += curr.count, 0);
    };

    getTotalCoins = () => {
        const { post } = this.props;

        return post.allAwardings.reduce((acc, curr) => acc += curr.count * curr.coinPrice, 0);
    };

    render() {
        const { getTotalAwards, getTotalCoins } = this;
        const { post } = this.props;

        if (post.allAwardings.length === 0) {
            return (
                <header className='results-text text-danger'>
                    Oops, <p className='reddit-text'>{post.title}</p> doesn't have any awards!
                </header>
            );
        }
        else {
            return (
                <div className='w-75 d-flex flex-column align-items-center text-center'>
                    <header className='results-text'>
                        <p className='reddit-text'>{post.title}</p>{` has a total of ${getTotalAwards()} awards`}
                    </header>
                    <div className='award-list'>
                        {post.allAwardings.map((award: Award) =>
                            <div>
                                <img className='award-icon mb-2' src={award.iconUrl} alt={award.name} />
                                <p className='d-inline ml-3'>{award.count} {award.name} awards</p>
                            </div>
                        )}
                    </div>
                    <header className='results-text'>
                        With a total cost of <p className='reddit-text'>{getTotalCoins()} coins</p>
                    </header>
                </div>
            );
        }
    }
}

type Props = {
    post: Post;
};