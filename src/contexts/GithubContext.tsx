import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface GithubContextProps {
  user: string | null;
  repos: string[];
  repo: string | null;
  readme: string | null;
  userLoading: boolean;
  searchUser: (username: string) => void;
  fetchReadme: (repo: string|null) => void;
  resetState: () => void;
}

const GithubContext = createContext<GithubContextProps | undefined>(undefined);

export const GithubProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<string[]>([]);
  const [repo, setRepo] = useState<string | null>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const resetState = () => {
    setRepos([]);
    setReadme(null);
    setRepo(null);
  }

  const searchUser = async (username: string) => {
    try {
      setUserLoading(true)
      resetState()
      await axios.get(`https://api.github.com/users/${username}/repos`).then(resp => {
        setUser(username);
        setRepos(resp.data.map((repo: { name: string }) => repo.name));
        setReadme(null);
        setUserLoading(false)
      });
    } catch (error: any) {
      if (error.response) {
        if (error.status === 404) {
          toast.error('User not found')
        }else{
          toast.error(error.response.data.message)
        }
      }else{
        toast.error(error.message)
      }
      setUserLoading(false)
    }
  };

  const fetchReadme = async (repo: string|null) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${user}/${repo}/readme`, {
        headers: {
          Accept: "application/vnd.github.v3.raw"
        }
      });
      setReadme(response.data);
      setRepo(repo);
    } catch (error: any) {
      if (error.response) {
        if (error.status === 404) {
          toast.error('Readme not found')
        }else{
          toast.error(error.response.data.message)
        }
      }else{
        toast.error(error.message)
      }
    }
  };

  return (
    <GithubContext.Provider value={{ user, repos, repo, readme, userLoading, searchUser, fetchReadme, resetState }}>
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
