import React from "react";
import { useGithub } from "../contexts/GithubContext";

interface ProjectListProps {
  onProjectClick: (projectName: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({ onProjectClick }) => {
  const { repos, repo } = useGithub();

  if (repos.length > 0) {
    return (
      <div>
        <h2 className="project-component">{repos.length} Repo(s) Found</h2>
        <div className="project-list">
          <ul>
            {repos.map((repoContent, repoIndex) => (
              <li key={repoContent} onClick={() => onProjectClick(repoContent)} className={repo === repoContent ? 'active' : ''}>
                {repoIndex+1}. {repoContent}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null
};
