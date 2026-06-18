import { memo } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavLink = memo(({ to, children, ...props }) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className="nav-item">
      <Link
        to={to}
        {...props}
        className={`nav-link ${isActive ? "active" : ""}`}
      >
        {children}
      </Link>
    </li>
  );
});

NavLink.displayName = "NavLink";

export default NavLink;