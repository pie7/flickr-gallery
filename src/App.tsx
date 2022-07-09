import React, { useState } from 'react';
import './App.css';
import { useFetch } from "./hooks/useFetch";
import * as API from "./apis";
import List from "./components/List";
import SearchBox from "./components/SearchBox";

export const AppContext = React.createContext({
  data: {
    items: []
  },
  isLoading: false
})


function App() {
  const [inputText, setInputText] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const { isLoading, data } = useFetch(API.photos_public(searchKeyword))

  const updateSearchInput = (e: any) => {
    setInputText(e.target.value)
  }
  const triggerSearch = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword)
    setInputText('')
  }
  return (
    <div className="App">
      <AppContext.Provider value={{ isLoading, data }}>
        <div className='container m-auto mt-10 overflow-hidden'>
          <SearchBox
            searchKeyword={inputText}
            updateSearchInput={updateSearchInput}
            triggerSearch={triggerSearch}
          />
          {isLoading ?
            <div>Is Loading...</div>
            :
            <List />
          }
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;