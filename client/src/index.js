import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import App from './App'
import posts from './reducers/Posts';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({ reducer: {
  posts: posts
}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

