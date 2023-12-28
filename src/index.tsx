import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Store from "./store/store";

interface StoreState {
    store: Store
}

const store = new Store();

export const Context = createContext<StoreState>({
    store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Context.Provider value={{
          store
        }}>
            <App />
        </Context.Provider>
    </React.StrictMode>
);