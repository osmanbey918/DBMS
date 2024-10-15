import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Feed from './components/feed/Feed';

function App() {
  return (
    <Provider store={store}>
       <Feed/>
    </Provider>
  );
}

export default App;
