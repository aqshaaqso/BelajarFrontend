import NavLink from "./NavLink";
import DarkMode from "./DarkMode";
import AppLogo from "./AppLogo";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "feather align-text-bottom me-2",
  "aria-hidden": "true",
};

const mainLinks = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: (
      <svg {...iconProps} className={`${iconProps.className} feather-home`}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: "/admin/orders",
    label: "Orders",
    icon: (
      <svg {...iconProps} className={`${iconProps.className} feather-file`}>
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
        <polyline points="13 2 13 9 20 9" />
      </svg>
    ),
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: (
      <svg
        {...iconProps}
        className={`${iconProps.className} feather-shopping-cart`}
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    to: "/admin/customers",
    label: "Customers",
    icon: (
      <svg {...iconProps} className={`${iconProps.className} feather-users`}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: "/admin/reports",
    label: "Reports",
    icon: (
      <svg
        {...iconProps}
        className={`${iconProps.className} feather-bar-chart-2`}
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    to: "/admin/settings",
    label: "Settings",
    icon: (
      <svg {...iconProps} className={`${iconProps.className} feather-layers`}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
];

const Sidebar = ({ showSidebar }) => (
  <nav
    id="sidebar"
    className={`col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse ${
      showSidebar ? "show" : ""
    }`}
  >
    <div className="position-sticky pt-3 sidebar-sticky">
      <div className="logo-wrap bg-dark text-center">
        <AppLogo width={200} />
      </div>
      <ul className="nav flex-column mt-4">
        {mainLinks.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </ul>
    </div>
    <DarkMode />
  </nav>
);

export default Sidebar;
