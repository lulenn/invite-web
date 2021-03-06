import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import 'antd/dist/antd.css';
import App from './modules/App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './modules/ErrorBound';

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
