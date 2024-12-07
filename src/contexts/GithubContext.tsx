import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface GithubContextProps {
  user: string | null;
  repos: string[];
  repo: string | null;
  readme: string | null;
  searchUser: (username: string) => void;
  fetchReadme: (repo: string) => void;
  resetState: () => void;
}

const GithubContext = createContext<GithubContextProps | undefined>(undefined);

export const GithubProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<string[]>([]);
  const [repo, setRepo] = useState<string | null>(null);
  const [readme, setReadme] = useState<string | null>(null);

  const resetState = () => {
    setRepos([]);
    setReadme(null);
    setRepo(null);
  }

  const searchUser = async (username: string) => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      setUser(username);
      setRepos(response.data.map((repo: { name: string }) => repo.name));
      setReadme(null); // Clear previous readme data when new user is searched
    } catch (error) {
      console.error("User not found");
    }
  };

  const fetchReadme = async (repo: string) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/readme`, {
        headers: {
          Accept: "application/vnd.github.v3.raw"
        }
      });
      setReadme(response.data);
      setRepo(repo);
    } catch (error) {
      console.error("Error fetching README", error);
    }
  };

  return (
    <GithubContext.Provider value={{ user, repos, repo, readme, searchUser, fetchReadme, resetState }}>
      {children}
    </GithubContext.Provider>
  );
};

export const useGithub = () => {
  const context = React.useContext(GithubContext);
  if (!context) {
    throw new Error("useGithub must be used within a GithubProvider");
  }
  return context;
};
