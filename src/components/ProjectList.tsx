import React from "react";
import { useGithub } from "../contexts/GithubContext";
import { Empty } from "./Empty";

interface ProjectListProps {
  onProjectClick: (projectName: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  const { repos, repo } = useGithub();

  return (
    <div className="project-list-container">
      <h4 className="project-component">Repo List {repos.length > 0 ? `(${repos.length})` : ''}</h4>
      <div className="project-list">
        {
          repos.length > 0 ?
          <ul>
            {repos.map((repoContent, repoIndex) => (
              <li key={repoContent} onClick={() => onProjectClick(repoContent)} className={repo === repoContent ? 'active' : ''}>
                {repoIndex+1}. {repoContent}
              </li>
            ))}
          </ul>
          :
          <Empty text="No repositories" />
        }
      </div>
    </div>
  );
};
