import React from "react";
import { Link } from "react-router-dom";

import {
  buttonSizes,
  gradientButtonBaseClasses,
} from "../../utils/gradientButtonUtils";

const GradientButton = ({
  children,
  to,
  size = "normal",
  className = "",
  showArrow = false,
  onClick,
  disabled = false,
  type = "button",
}) => {
  const classes = `
    ${gradientButtonBaseClasses}
    ${buttonSizes[size]}
    ${className}
  `;

  const content = (
    <>
      {children}

      {showArrow && (
        <span className="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={classes}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {content}
    </button>
  );
};

export default GradientButton;