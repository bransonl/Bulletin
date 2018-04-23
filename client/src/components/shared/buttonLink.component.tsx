import * as React from "react";
import {Link, LinkProps} from "react-router-dom";

interface ButtonLinkProps extends LinkProps {
  className?: string;
  disabled?: boolean;
}

const ButtonLinkComponent: React.SFC<ButtonLinkProps> = (
  {className = "", disabled = false, ...rest},
) => {
  const buttonLinkClassName = `btn ${className} ${disabled ? "disabled" : ""}`;
  return <Link {...rest} className={buttonLinkClassName} />;
};

export default ButtonLinkComponent;
