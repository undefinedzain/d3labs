import React, { useState, Suspense } from "react";
import { SearchBar } from "./components/SearchBar";
import { ProjectList } from "./components/ProjectList";
import { GithubProvider } from "./contexts/GithubContext";
import { SunIcon } from "@heroicons/react/24/outline";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const ProjectReadme = React.lazy(
        () => import("./components/ProjectReadme")
    );

    return (
        <GithubProvider>
            <div className="App">
                <h2 className="project-name">GitHub Projects Viewer</h2>
                <SearchBar />
                <div className="project-container">
                    <ProjectList onProjectClick={setSelectedProject} />
                    <div className="readme-container">
                      <h2 className="project-component">README</h2>
                      <div className="readme-result-container">
                        <Suspense
                            fallback={
                                <div className="loading-container">
                                    <SunIcon
                                        width={24}
                                        height={24}
                                        color="#143E7F"
                                        className="loading-indicator"
                                    />
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
