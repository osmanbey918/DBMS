import './App.css';
import { Provider } from 'react-redux';
import  store  from './store/store';
import Feed from './components/feed/Feed';
import Feed2 from './components/feed/Feed2';

function App() {
  return (
    <Provider store={store}>
       <Feed/>
    </Provider>
  );
}

export default App;
