import React, { useEffect } from "react";
import { useGithub } from "../contexts/GithubContext";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Empty } from "./Empty";

interface ProjectReadmeProps {
  projectName: string | null;
}

const ProjectReadme: React.FC<ProjectReadmeProps> = ({ projectName }) => {
  const { user, readme, fetchReadme } = useGithub();

  useEffect(() => {
    if (user && projectName && user) {
      fetchReadme(projectName);
    }
  }, [user, projectName, fetchReadme]);

  return readme && user ? (
    <Markdown
      children={readme}
      components={{
        code(props) {
          const { children, className, node, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              ref={undefined}
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={okaidia}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  ) : (
    <Empty text="No readme to show" />
  );
};

export default ProjectReadme;
