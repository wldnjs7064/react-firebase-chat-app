import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "./redux/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./redux/reducers";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider
    store={createStoreWithMiddleware(
      Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <Router>
      <App />
    </Router>
    <Toaster />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
