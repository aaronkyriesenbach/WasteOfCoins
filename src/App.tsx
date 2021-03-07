import './_styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <nav className='navbar navbar-dark bg-primary mb-4'>
        <a className='navbar-brand' href='/'>Waste of Coins</a>
      </nav>

      <div className='container-fluid'>
        <div className='d-flex flex-column align-items-center'>
          <header className='header-text mb-4'>How much money have Redditors spent on...</header>
          <input type='text'
            className='post-link-input'
            placeholder='copy the link to a reddit post here!' />
        </div>
      </div>
    </div>
  );
}

export default App;
