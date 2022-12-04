import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import {store, persistor} from './redux/store'

ReactDOM.render(
    // <FontStyles />
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);