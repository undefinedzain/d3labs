import React from "react";
import { PuzzlePieceIcon } from "@heroicons/react/24/outline";

interface EmptyProps {
  text: string;
}

export const Empty: React.FC<EmptyProps> = ({ text }) => {

  return (
    <div className="empty-container">
      <PuzzlePieceIcon style={{color: '#143E7F', width: 48, height: 48}} />
      <p>{text}</p>
    </div>
  );
};
