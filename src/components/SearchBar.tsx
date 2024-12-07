import React, { useEffect, useState } from "react";
import { useGithub } from "../contexts/GithubContext";
import useDebounce from "../utils/useDebounce";

export const SearchBar: React.FC = () => {
  const { searchUser, resetState, userLoading } = useGithub();
  const [username, setUsername] = useState("");
  const debounceUsernameSearch = useDebounce(username, 500);

  useEffect(() => {
    if (debounceUsernameSearch) {
      if (username.length > 3) {
        searchUser(username);
      }else{
        resetState();
      }
    }else{
      resetState();
    }
    // eslint-disable-next-line
  }, [debounceUsernameSearch]);

  return (
    <div className="search-bar">
      <div className="search-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        {userLoading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="loading-indicator">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>}
      </div>
    </div>
  );
};
