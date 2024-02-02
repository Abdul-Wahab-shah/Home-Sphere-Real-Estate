import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {store} from '../src/reduxToolkit/store.js'
import { Provider } from 'react-redux';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);
