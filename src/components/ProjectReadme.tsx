import React, { useEffect } from "react";
import { useGithub } from "../contexts/GithubContext";
import Markdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {okaidia} from 'react-syntax-highlighter/dist/esm/styles/prism'

interface ProjectReadmeProps {
  projectName: string;
}

const ProjectReadme: React.FC<ProjectReadmeProps> = ({ projectName }) => {
  const { user, readme, fetchReadme } = useGithub();

  useEffect(() => {
    if (user) {
      fetchReadme(projectName);
    }
  }, [user, projectName, fetchReadme]);

  return (
    <div className="readme-container">
      <h2 className="project-component">README</h2>
      {readme ? (
        <div className="readme-result-container">
          <Markdown
            children={readme}
            components={{
              code(props) {
                const {children, className, node, ...rest} = props
                const match = /language-(\w+)/.exec(className || '')
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    ref={undefined}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={okaidia}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                )
              }
            }}
          />
        </div>
      ) : (
        <p>Loading readme...</p>
      )}
    </div>
  );
};

export default ProjectReadme;
