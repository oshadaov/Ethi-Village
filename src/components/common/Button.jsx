import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  href,
  variant = "primary",
  className = "",
  onClick,
  state,
  disabled = false,
  type = "button",
}) {
  const baseStyles = "items-center justify-center px-8 py-4 font-bold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-premium hover:shadow-premium-hover",
    secondary: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
    accent: "bg-accent text-white hover:opacity-90 shadow-premium hover:shadow-premium-hover",
    ghost: "bg-transparent text-primary hover:bg-bg",
  };

  const displayStyle = className.includes("hidden") ? "" : "inline-flex";
  const combinedClasses = `${displayStyle} ${baseStyles} ${variants[variant] || variants.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} state={state} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <button 
      type={type}
      className={combinedClasses} 
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
