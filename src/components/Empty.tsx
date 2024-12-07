import React from "react";
import Lottie from "lottie-react";
import emptyAnimation from '../animations/empty.json'

interface EmptyProps {
  text: string;
}

export const Empty: React.FC<EmptyProps> = ({ text }) => {

  return (
    <div className="empty-container">
      <Lottie style={{width: 250}} animationData={emptyAnimation} loop={true} />
      <p>{text}</p>
    </div>
  );
};
