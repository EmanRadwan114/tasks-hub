import { createContext, useContext, useState } from "react";

const searchContext = createContext();

function SearchContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <searchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </searchContext.Provider>
  );
}

export const useSearch = () => {
  const { searchTerm, setSearchTerm } = useContext(searchContext);
  return { searchTerm, setSearchTerm };
};

export default SearchContextProvider;
