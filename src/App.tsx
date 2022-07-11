import React, { useState } from 'react';
import './App.css';
import { useFetch } from "./hooks/useFetch";
import * as API from "./apis";
import List from "./components/List";
import SearchBox from "./components/SearchBox";
import Filter from "./components/Filter";

export const AppContext = React.createContext({
  data: {
    items: []
  },
  isLoading: false,
  sortType: ''
})


function App() {
  const [inputText, setInputText] = useState('')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [sortType, setSortType] = useState('')
  const { isLoading, data } = useFetch(API.photos_public(searchKeyword))

  const updateSearchInput = (e: any) => {
    setInputText(e.target.value)
  }
  const triggerSearch = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword)
    setInputText('')
  }
  const handleChange = (e: any) => {
    setSortType(e.target.value)
}
  return (
    <div className="App">
      <AppContext.Provider value={{ isLoading, data, sortType }}>
        <div className='container m-auto mt-10 overflow-hidden px-3'>
          <Filter onChange={handleChange}/>
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