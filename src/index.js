import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles/styles.scss";
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
