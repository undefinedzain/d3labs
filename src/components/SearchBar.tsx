import React, { useEffect, useState } from "react";
import { useGithub } from "../contexts/GithubContext";
import useDebounce from "../utils/useDebounce";

export const SearchBar: React.FC = () => {
  const { searchUser, resetState } = useGithub();
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
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
    </div>
  );
};
