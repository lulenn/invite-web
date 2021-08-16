import './App.less';
import Home from './Home';
import { APP_COPYRIGHT, APP_TITLE } from './constant';

function App(): JSX.Element {
  return (
    <div className="App">
      <div className="Header">{APP_TITLE}</div>
      <Home />
      <div className="Footer">
        <p>Made with ❤️ Melbourne.</p>
        <p>{APP_COPYRIGHT}</p>
      </div>
    </div>
  );
}

export default App;
