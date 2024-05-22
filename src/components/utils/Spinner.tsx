// @ts-ignore
import React from "react";

type SpinnerProps = {
  size: number;
  className?: string;
};

const Spinner = ({ size, className }: SpinnerProps): React.JSX.Element => {
  return (
    <svg
      width={size}
      viewBox="0 0 24 24"
      className={`${className} dark:fill-white fill-black`}
    >
      <g>
        <rect x="11" y="2.5" width="2" height="5" opacity=".08" rx={1} />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(30 12 12)"
          opacity=".14"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(60 12 12)"
          opacity=".16"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(90 12 12)"
          opacity=".24"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(120 12 12)"
          opacity=".32"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(150 12 12)"
          opacity=".40"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(180 12 12)"
          opacity=".48"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(210 12 12)"
          opacity=".56"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(240 12 12)"
          opacity=".64"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(270 12 12)"
          opacity=".72"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(300 12 12)"
          opacity=".80"
          rx={1}
        />
        <rect
          x="11"
          y="2.5"
          width="2"
          height="5"
          transform="rotate(330 12 12)"
          opacity=".88"
          rx={1}
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          calcMode="discrete"
          dur="1.5s"
          values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
};
export default Spinner;
