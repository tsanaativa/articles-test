import React, { FC } from "react";

type Props = {
  onClick: () => void;
};

const ShareButton: FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="btn-icon">
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.5 6C14.7426 6 15.75 4.99264 15.75 3.75C15.75 2.50736 14.7426 1.5 13.5 1.5C12.2574 1.5 11.25 2.50736 11.25 3.75C11.25 4.99264 12.2574 6 13.5 6Z"
          stroke="#313131"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M4.5 11.25C5.74264 11.25 6.75 10.2426 6.75 9C6.75 7.75736 5.74264 6.75 4.5 6.75C3.25736 6.75 2.25 7.75736 2.25 9C2.25 10.2426 3.25736 11.25 4.5 11.25Z"
          stroke="#313131"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M13.5 16.5C14.7426 16.5 15.75 15.4926 15.75 14.25C15.75 13.0074 14.7426 12 13.5 12C12.2574 12 11.25 13.0074 11.25 14.25C11.25 15.4926 12.2574 16.5 13.5 16.5Z"
          stroke="#313131"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M6.44263 10.1326L11.5651 13.1176"
          stroke="#313131"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M11.5576 4.88257L6.44263 7.86757"
          stroke="#313131"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </button>
  );
};

export default ShareButton;
