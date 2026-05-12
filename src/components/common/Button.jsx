import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  onClick,
  state,
}) {
  if (to) {
    return (
      <Link to={to} state={state} className={`btn btn-${variant} ${className}`}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`btn btn-${variant} ${className}`}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button className={`btn btn-${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
