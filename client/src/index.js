import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import {configureStore} from '@reduxjs/toolkit'
import { rootReducer } from './redux/rootReducer'

const finalReducer = combineReducers({
  rootReducer: rootReducer
})

const preloadedState = {
  rootReducer: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')) : []
  }
}

const store = configureStore({
  reducer : finalReducer,
  preloadedState
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);