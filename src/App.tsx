import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import React from 'react';
import CurrencyApi from './api/CurrencyApi';
import { mapPost } from './api/Mappers';
import { Post } from './api/Post';
import RedditApi from './api/RedditApi';
import PasteOnlyInput from './components/PasteOnlyInput';
import Results from './components/Results';
import { ERROR_MESSAGE, POST_URL_REGEX } from './constants';
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
    const { validateUrl } = this;
    const { url, post, error } = this.state || {};

    if (post && (validateUrl(url) !== undefined || !url.includes(post.id))) {
      this.setState({ post: undefined });
    }

    if (url && !error && !post) {
      const { redditApi } = this.state;

      redditApi.getPost(url)
        .then(res => {
          const unmappedPost = res.data[0].data.children[0].data;
          const post = mapPost(unmappedPost);

          this.setState({ post: post });
        })
        .catch(() => this.setState({ error: ERROR_MESSAGE }));
    }
  }

  validateUrl = (url?: string): string | undefined => {
    if (!url || !POST_URL_REGEX.test(url)) {
      return ERROR_MESSAGE;
    }

    const reducedUrl = url.match(POST_URL_REGEX)![0];

    if (url && url !== reducedUrl) {
      this.setState({ url: reducedUrl });
    }
  };

  updateUrl = (url: string): void => {
    const { validateUrl } = this;

    this.setState({ url: url });
    this.setState({ error: validateUrl(url) });
  };

  render() {
    const { updateUrl } = this;
    const { url, post, error, currencyApi } = this.state || {};

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
          {post && <Results currencyApi={currencyApi} post={post} />}
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
  error?: string;
};