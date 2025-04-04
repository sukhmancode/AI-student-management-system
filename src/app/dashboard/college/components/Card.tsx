import React from "react";
import "../styles/card.scss";

interface Props {
  secondaryHeading?: string;
  number?: number | string;
  secondary?: string;
}
export default function Card({ secondaryHeading, number, secondary }: Props) {
  return (
    <>
      <div className="card-container">
        <p className="card-secondary-heading">{secondaryHeading}</p>
        <p className="card-number  bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 mt-2 ">
          <span>{number}</span>
          <span>{secondary}</span>
        </p>
      </div>
    </>
  );
}
