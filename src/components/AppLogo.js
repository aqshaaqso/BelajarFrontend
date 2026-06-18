const themes = {
  dark: {
    primary: "#ffffff",
    secondary: "#a89cff",
    iconBg: "#6246ea",
    iconFg: "#ffffff",
  },
  light: {
    primary: "#2b2c34",
    secondary: "#6246ea",
    iconBg: "#6246ea",
    iconFg: "#ffffff",
  },
};

const AppLogo = ({ width = 200, showText = true, theme = "dark" }) => {
  const colors = themes[theme] || themes.dark;

  return (
    <svg
      width={width}
      viewBox="0 0 220 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dashboard"
    >
      <rect x="2" y="6" width="36" height="36" rx="10" fill={colors.iconBg} />
      <path
        d="M12 30V18h6.5c2.2 0 3.8 1.4 3.8 3.4 0 1.3-.7 2.4-1.9 2.9L23 30h-3.2l-2.1-4.8H15V30H12zm3-7.5h3.1c1 0 1.6-.5 1.6-1.3 0-.8-.6-1.3-1.6-1.3H15v2.6zM26.5 30V18H34c2.4 0 4 1.5 4 3.6 0 1.5-.8 2.7-2.1 3.2L39 30h-3.4l-2.4-4.7h-3.4V30h-3.2zm3-7.3h2.8c.9 0 1.4-.4 1.4-1.1 0-.7-.5-1.1-1.4-1.1h-2.8v2.2z"
        fill={colors.iconFg}
      />
      {showText && (
        <>
          <text
            x="50"
            y="22"
            fill={colors.primary}
            fontSize="16"
            fontWeight="700"
            fontFamily="Segoe UI, sans-serif"
          >
            Admin
          </text>
          <text
            x="50"
            y="38"
            fill={colors.secondary}
            fontSize="12"
            fontFamily="Segoe UI, sans-serif"
          >
            Dashboard
          </text>
        </>
      )}
    </svg>
  );
};

export default AppLogo;