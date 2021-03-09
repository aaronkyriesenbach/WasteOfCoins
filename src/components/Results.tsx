import LocaleCurrency from 'locale-currency';
import React from 'react';
import { Award } from '../api/Award';
import { Comment } from '../api/Comment';
import CurrencyApi from '../api/CurrencyApi';
import { Post } from '../api/Post';
import { COINS_PER_DOLLAR } from '../constants';
import './_styles.scss';

export default class Results extends React.Component<Props, {}> {
    getTotalAwards = () => {
        const { value } = this.props;

        return value.allAwardings
            .reduce((acc, curr) => acc += curr.count, 0);
    };

    getTotalCoins = () => {
        const { value } = this.props;

        return value.allAwardings
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
        const { value } = this.props;

        if (value.allAwardings.length === 0) {
            return (
                <header className='results-container mb-4 results-text text-danger text-center'>
                    Oops, {'title' in value ? <p className='reddit-text'>{value.title}</p> : 'this comment'} doesn't have any awards!
                </header>
            );
        }
        else {
            return (
                <div className='results-container mb-4 d-flex flex-column align-items-center text-center results-text'>
                    <div>
                        {'title' in value ? <p className='reddit-text'>{value.title}</p> : 'This comment'} has {getTotalAwards()} award{getTotalAwards() > 1 && 's'}:
                    </div>
                    <div>
                        {value.allAwardings.map((award: Award) =>
                            <div key={award.id}>
                                <img className='award-icon mb-2' src={award.iconUrl} alt={award.name} />
                                <p className='d-inline ml-3 award'>{award.count} {award.name} award{award.count > 1 && 's'} ({award.coinPrice} coins)</p>
                            </div>
                        )}
                    </div>
                    <div>
                        A value of <p className='reddit-text'>{getTotalCoins()} coins</p>...
                    </div>
                    <div>
                        And costs a grand total of <p className='reddit-text'>{getTotalValue()}</p>!
                    </div>
                </div>
            );
        }
    }
}

type Props = {
    currencyApi: CurrencyApi,
    value: Post | Comment;
};