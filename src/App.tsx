import React, { useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { ProjectList } from "./components/ProjectList";
import { GithubProvider } from "./contexts/GithubContext";

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const ProjectReadme = React.lazy(() => import('./components/ProjectReadme'));

  return (
    <GithubProvider>
      <div className="App">
        <h1 className="project-name">GitHub Projects Viewer</h1>
        <SearchBar />
        <div className="project-container">
          <ProjectList onProjectClick={setSelectedProject} />
          <div className="project-gap" />
          {selectedProject && <ProjectReadme projectName={selectedProject} />}
        </div>
      </div>
    </GithubProvider>
  );
};

export default App;
