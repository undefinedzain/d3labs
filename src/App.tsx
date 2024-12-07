import React, { useState, Suspense } from "react";
import { SearchBar } from "./components/SearchBar";
import { ProjectList } from "./components/ProjectList";
import { GithubProvider } from "./contexts/GithubContext";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const ProjectReadme = React.lazy(
        () => import("./components/ProjectReadme")
    );

    return (
        <GithubProvider>
            <div className="App">
                <h3 className="project-name">GitHub Projects Viewer</h3>
                <SearchBar />
                <div className="project-container">
                    <ProjectList onProjectClick={setSelectedProject} />
                    <div className="readme-container">
                      <h4 className="project-component">README</h4>
                      <div className="readme-result-container">
                        <Suspense
                            fallback={
                                <div className="loading-container">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                    <p>Loading readme...</p>
                                </div>
                            }
                        >
                            <ProjectReadme projectName={selectedProject} />
                        </Suspense>
                      </div>
                    </div>
                </div>
                <Toaster position="bottom-center" />
            </div>
        </GithubProvider>
    );
};

export default App;
