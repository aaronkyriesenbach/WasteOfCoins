import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import React from 'react';
import { Comment } from './api/Comment';
import CurrencyApi from './api/CurrencyApi';
import { mapComment, mapPost } from './api/Mappers';
import { Post } from './api/Post';
import RedditApi from './api/RedditApi';
import PasteOnlyInput from './components/PasteOnlyInput';
import Results from './components/Results';
import { COMMENT_URL_REGEX, ERROR_MESSAGE, POST_URL_REGEX } from './constants';
import './_styles.scss';

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redditApi: new RedditApi(),
      currencyApi: new CurrencyApi(),
      url: '',
    };
  }

  componentDidUpdate() {
    const { url, post, error, comment } = this.state || {};

    if (url && !error && !post && !comment) {
      const { redditApi } = this.state;

      redditApi.getUrl(url)
        .then(res => {
          if (COMMENT_URL_REGEX.test(url)) {
            const unmappedComment = res.data[1].data.children[0].data;
            const comment = mapComment(unmappedComment);

            this.setState({ comment: comment });
          }
          else {
            const unmappedPost = res.data[0].data.children[0].data;
            const post = mapPost(unmappedPost);

            this.setState({ post: post });
          }
        })
        .catch(() => this.setState({ error: ERROR_MESSAGE }));
    }
  }

  reduceUrl = (url: string): string => {
    const match = url.match(COMMENT_URL_REGEX) ?? url.match(POST_URL_REGEX)!;
    let reducedUrl = match[0];

    // Prepend www. to bare URLs and replace new. and m. with www. to avoid CORS errors
    if (!match[2] || match[2] === 'new.' || match[2] === 'm.') {
      reducedUrl = `${match[1]}www.${match[3]}`;
    }

    return reducedUrl;
  };

  validateUrl = (url?: string): string | undefined => {
    if (!url || !POST_URL_REGEX.test(url)) {
      return ERROR_MESSAGE;
    }
  };

  updateUrl = (url: string): void => {
    const { validateUrl, reduceUrl } = this;
    const validation = validateUrl(url);

    // Clear loaded post/comment from state when a new URL is entered
    this.setState({ url: validation ? url : reduceUrl(url), error: validation, post: undefined, comment: undefined });
  };

  render() {
    const { updateUrl } = this;
    const { url, post, error, currencyApi, comment } = this.state || {};

    return (
      <div>
        <nav className='navbar'>
          <a className='navbar-brand' href='/'>
            <img className='navbar-brand logo mr-2 pt-0' src='coins.png' alt='Reddit coins' />
            Waste of Coins
          </a>
        </nav>

        <div className='container-fluid d-flex flex-column align-items-center text-center'>
          <header className='header-text'>How much money has <p className='reddit-text'>Reddit</p> spent on...</header>
          <PasteOnlyInput
            className={classnames('url-input m-2', { 'text-danger': error })}
            placeholder='paste the link to a reddit post here!'
            value={url}
            onUpdate={updateUrl}
          />
          {error && url && <p className='error text-danger'>{error}</p>}
          {post && <Results currencyApi={currencyApi} value={post} />}
          {comment && <Results currencyApi={currencyApi} value={comment} />}
        </div>

        <div className='bottom-text fixed-bottom d-flex justify-content-between'>
          <a className='ml-1' href='https://github.com/aaronkyriesenbach/waste-of-coins' target='_blank' rel='noreferrer'>github</a>
          <a className='mr-1' href='https://buymeacoffee.com/kyriesenbach' target='_blank' rel='noreferrer'>made with ❤️ by aaron ky-riesenbach</a>
        </div>
      </div>
    );
  }
}

type State = {
  redditApi: RedditApi,
  currencyApi: CurrencyApi,
  url: string,
  post?: Post,
  comment?: Comment,
  error?: string;
};