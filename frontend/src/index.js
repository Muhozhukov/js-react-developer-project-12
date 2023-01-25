import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Provider as ErrorProvider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { store } from './storeManager/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';

const rollbarConfig = {
  accessToken: '2a5c922ae13b493c990a30a42d2d2abc',
  environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ErrorProvider config={rollbarConfig}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </ErrorProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
