import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store";
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('gameroom-stage')).render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
)
