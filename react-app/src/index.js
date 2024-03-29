import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import SearchProvider from "./context/Query";

const store = configureStore();

if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
}

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <SearchProvider>
                <ModalProvider>
                    <App />
                </ModalProvider>
            </SearchProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
