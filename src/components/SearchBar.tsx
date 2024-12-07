import React, { useEffect, useState } from "react";
import { useGithub } from "../contexts/GithubContext";
import useDebounce from "../utils/useDebounce";
import { SunIcon } from '@heroicons/react/24/outline'

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
        {userLoading && <SunIcon width={24} height={24} color="#143E7F" className="loading-indicator" />}
      </div>
    </div>
  );
};
