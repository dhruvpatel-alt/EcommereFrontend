import React from "react";

function Icon({color}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
      <path
        fill={color||"#0f5191"}
        d="M0 22v-2.75c0-3.026 4.95-5.5 11-5.5s11 2.475 11 5.5V22zM5.5 5.5A5.5 5.5 0 1111 11a5.5 5.5 0 01-5.5-5.5z"
      ></path>
    </svg>
  );
}

export default Icon;
