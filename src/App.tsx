import 'bootstrap/dist/css/bootstrap.min.css';
import classnames from 'classnames';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Comment } from './api/Comment';
import CurrencyApi from './api/CurrencyApi';
import { mapComment, mapPost } from './api/Mappers';
import { Post } from './api/Post';
import RedditApi from './api/RedditApi';
import PasteOnlyInput from './components/PasteOnlyInput';
import Results from './components/Results';
import {
  BASE_COMMENT_PATH_REGEX, BASE_POST_PATH_REGEX, COMMENT_URL_REGEX,
  ERROR_MESSAGE,
  POST_URL_REGEX
} from './constants';
import './_styles.scss';

export default class App extends React.Component<RouteComponentProps, State> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      redditApi: new RedditApi(),
      currencyApi: new CurrencyApi(),
      url: '',
      wentBack: false
    };
  }

  componentDidMount() {
    const { updateUrl } = this;
    const { history } = this.props;
    const path = window.location.pathname;

    if (BASE_POST_PATH_REGEX.test(path) || BASE_COMMENT_PATH_REGEX.test(path)) {
      updateUrl(window.location.protocol + '//www.reddit.com' + path);
    }
    else if (path !== '/') {
      window.location.href = '/';
    }

    history.listen(() => {
      if (history.action === 'POP') {
        this.setState({ url: '', post: undefined, comment: undefined, wentBack: true });
      }
    });
  }

  componentDidUpdate() {
    const { setPath, updateUrl } = this;
    const { url, post, error, comment, wentBack } = this.state || {};

    if (wentBack) {
      const path = window.location.pathname;

      if (BASE_POST_PATH_REGEX.test(path) || BASE_COMMENT_PATH_REGEX.test(path)) {
        const url = window.location.protocol + '//www.reddit.com' + path;

        updateUrl(url);
      }
      this.setState({ wentBack: false });
    }
    else if (url && !error && !post && !comment) {
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
        .then(() => setPath())
        .catch(() => this.setState({ error: ERROR_MESSAGE }));
    }
  }

  setPath = () => {
    const { history, location } = this.props;
    const { url, error } = this.state;

    if (url && !error) {
      const match = url.match(COMMENT_URL_REGEX) ?? url.match(POST_URL_REGEX)!;
      const path = match[3];

      if (!location.pathname.includes(path)) {
        history.push(path);
        this.setState({ wentBack: false });
      }
    }
  };

  reduceUrl = (url: string): string => {
    const match = url.match(COMMENT_URL_REGEX) ?? url.match(POST_URL_REGEX)!;
    let reducedUrl = match[0];

    // Prepend www. to bare URLs and replace new. and m. with www. to avoid CORS errors
    if (!match[2] || match[2] === 'new.' || match[2] === 'm.') {
      reducedUrl = `${match[1]}www.reddit.com${match[3]}`;
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
            <img className='navbar-brand logo mr-2 pt-0' src='/coins.png' alt='Reddit coins' />
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
  error?: string,
  wentBack: boolean;
};