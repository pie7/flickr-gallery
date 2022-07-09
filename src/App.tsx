import React from 'react';
import './App.css';
import { useFetch } from "./hooks/useFetch";
import * as API from "./apis";
import List from "./components/List";

export const AppContext = React.createContext({
  data: {
    items: []
  },
  isLoading: false
})

function App() {
  const { isLoading, data } = useFetch(API.photos_public())
  return (
    <div className="App">
      <AppContext.Provider value={{ isLoading, data }}>
        <div className='container m-auto mt-10 overflow-hidden'>
          <List />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;