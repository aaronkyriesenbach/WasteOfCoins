import LocaleCurrency from 'locale-currency';
import React from 'react';
import { Award } from '../api/Award';
import CurrencyApi from '../api/CurrencyApi';
import { Post } from '../api/Post';
import { COINS_PER_DOLLAR } from '../constants';
import './_styles.scss';

export default class Results extends React.Component<Props, {}> {
    getTotalAwards = () => {
        const { post } = this.props;

        return post.allAwardings
            .reduce((acc, curr) => acc += curr.count, 0);
    };

    getTotalCoins = () => {
        const { post } = this.props;

        return post.allAwardings
            .reduce((acc, curr) => acc += curr.count * curr.coinPrice, 0);
    };

    getTotalValue = () => {
        const { getTotalCoins } = this;
        const { currencyApi } = this.props;

        const lang = navigator.languages !== undefined ? navigator.languages[0] : navigator.language ?? 'en-US';
        const currency = LocaleCurrency.getCurrency(lang) ?? 'USD';

        const valueInUSD = getTotalCoins() / COINS_PER_DOLLAR;
        const convertedValue = currencyApi.convert(valueInUSD, 'USD', currency);

        return Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(convertedValue);
    };

    render() {
        const { getTotalAwards, getTotalCoins, getTotalValue } = this;
        const { post } = this.props;

        if (post.allAwardings.length === 0) {
            return (
                <header className='w-75 mb-4 results-text text-danger text-center'>
                    Oops, <p className='reddit-text'>{post.title}</p> doesn't have any awards!
                </header>
            );
        }
        else {
            return (
                <div className='w-75 mb-4 d-flex flex-column align-items-center text-center results-text'>
                    <div>
                        <p className='reddit-text'>{post.title}</p>{` has ${getTotalAwards()} awards:`}
                    </div>
                    <div>
                        {post.allAwardings.map((award: Award) =>
                            <div key={award.id}>
                                <img className='award-icon mb-2' src={award.iconUrl} alt={award.name} />
                                <p className='d-inline ml-3 award'>{award.count} {award.name} award{award.count > 1 && 's'}</p>
                            </div>
                        )}
                    </div>
                    <div>
                        A value of <p className='reddit-text'>{getTotalCoins()} coins</p>...
                    </div>
                    <div>
                        And a grand total of <p className='reddit-text'>{getTotalValue()}</p>!
                    </div>
                </div>
            );
        }
    }
}

type Props = {
    currencyApi: CurrencyApi,
    post: Post;
};