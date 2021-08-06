import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CartContextProvider } from './store/context';

ReactDOM.render(
  <CartContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartContextProvider>,
  document.getElementById('root')
);
