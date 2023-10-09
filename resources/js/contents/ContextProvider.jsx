import { createContext, useContext, useState } from 'react';

// Create a new context with default values for currentUser, userToken, setCurrentUser, and setUserToken
const StateContext = createContext({

  searchQuery: '',
  setSearchQuery: () => {},
});

// ContextProvider component that wraps the application and provides the state and functions to child components
export const ContextProvider = ({ children }) => {
  const [searchQuery, _setSearchQuery] = useState('');


  // Function to update the searchQuery state
  const setSearchQuery = (query) => {
    if (query) {
      // If query is provided, set it in localStorage
      localStorage.setItem('QUERY', query);
    } else {
      // If query is not provided, remove the 'QUERY' key from localStorage
      localStorage.removeItem('QUERY');
    }
    // Update the searchQuery state with the provided query
    _setSearchQuery(query);
  };

  // Provide the currentUser, userToken, searchQuery, setCurrentUser, setUserToken, and setSearchQuery as values to child components
  return (
    <StateContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state and functions provided by the ContextProvider
export const useStateContext = () => useContext(StateContext);
