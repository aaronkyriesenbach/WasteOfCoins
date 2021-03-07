import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { mapPost } from './api/Mappers';
import { Post } from './api/Post';
import RedditApi from './api/RedditApi';
import PasteOnlyInput from './components/PasteOnlyInput';
import './_styles.scss';

export default class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      redditApi: new RedditApi(),
      url: ''
    };
  }

  componentDidUpdate(prevState: State) {
    const { validateUrl } = this;
    const { url } = this.state || {};

    if (url && validateUrl(url) && url !== prevState.url) {
      const { redditApi } = this.state;

      redditApi.getPost(url)
        .then(res => {
          const unmappedPost = res.data[0].data.children[0].data;
          const post = mapPost(unmappedPost);

          this.setState({ post: post });
        });
    }
  }

  validateUrl = (url: string | undefined): string | undefined => {
    const regex = new RegExp('.*reddit.*');

    if (!url || !regex.test(url)) {
      return "oops, that's not a valid reddit post!";
    }
  };

  render() {
    const { validateUrl } = this;
    const { url } = this.state || {};

    return (
      <div>
        <nav className='navbar'>
          <a className='navbar-brand' href='/'>Waste of Coins</a>
        </nav>

        <div className='container-fluid'>
          <div className='d-flex flex-column align-items-center'>
            <header className='header-text mb-4'>How much money has <p className='reddit-text'>Reddit</p> spent on...</header>
            <PasteOnlyInput
              className='url-input'
              placeholder='paste the link to a reddit post here!'
              value={url}
              validator={validateUrl}
              onUpdate={(url: string) => this.setState({ url: url })}
            />
          </div>
        </div>
      </div>
    );
  }
}

type State = {
  redditApi: RedditApi,
  url: string,
  post?: Post;
};