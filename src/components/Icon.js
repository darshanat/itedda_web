import React from "react";

// One consistent line-icon set (24px grid, 1.6 stroke) replacing the emoji.
const paths = {
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="0.8" />
      <path d="M9 2.5v3.5M15 2.5v3.5M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5" />
    </>
  ),
  bolt: <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12z" />,
  cube: (
    <>
      <path d="m12 2.8 8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
      <path d="M4 7.2 12 12l8-4.8M12 12v9.2" />
    </>
  ),
  flask: (
    <>
      <path d="M9.5 3h5M10.5 3v6.2L5 19a1.6 1.6 0 0 0 1.4 2.4h11.2A1.6 1.6 0 0 0 19 19l-5.5-9.8V3" />
      <path d="M7.6 14.5h8.8" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  cloud: <path d="M7 18.5a4.5 4.5 0 0 1-.6-8.96 6 6 0 0 1 11.6 1.46A3.8 3.8 0 0 1 17.5 18.5z" />,
  plug: (
    <>
      <path d="M9 2.5v5M15 2.5v5M6 7.5h12v3.2a6 6 0 0 1-6 6 6 6 0 0 1-6-6zM12 16.7v4.8" />
    </>
  ),
  rocket: (
    <>
      <path d="M12 2.5c3.6 2 5.5 5.6 5.5 9.5l-2.2 3.3h-6.6L6.5 12c0-3.9 1.9-7.5 5.5-9.5z" />
      <circle cx="12" cy="9.5" r="1.8" />
      <path d="M8.7 15.3 6 17.8l1 3 3-1.8M15.3 15.3l2.7 2.5-1 3-3-1.8" />
    </>
  ),
  kanban: (
    <>
      <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
      <path d="M9 3.5v17M15 3.5v17M5.5 8h1M5.5 11h1M11.5 8h1M17.5 8h1M17.5 11h1M17.5 14h1" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.8 8.2-2 5.6-5.6 2 2-5.6z" />
    </>
  ),
  circuit: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="18" cy="7" r="1.5" />
      <path d="M8 6h5.5a2.5 2.5 0 0 1 2.5 2.5V16M6 8v5.5a2.5 2.5 0 0 0 2.5 2.5H16M18 8.5V12" />
    </>
  ),
  cpu: (
    <>
      <rect x="4.5" y="4.5" width="15" height="15" rx="3" />
      <path d="M9 12h1.5l1-2.5 1.5 5 1-2.5H15" />
    </>
  ),
  code: <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />,
  factory: (
    <>
      <path d="M3 21V10l6 3.5V10l6 3.5V5.5h4.5V21zM7 17h2M12 17h2M17 17h.01" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6.2 6.2 0 0 0-3.6 11.3c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6.2 6.2 0 0 0 12 3z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8 4.5 5.6v6.2c0 4.5 3 8 7.5 9.4 4.5-1.4 7.5-4.9 7.5-9.4V5.6z" />
      <path d="m8.8 12 2.3 2.3 4.2-4.6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.3" />
      <path d="M2.8 20c.4-3.6 3-5.6 6.2-5.6s5.8 2 6.2 5.6" />
      <path d="M16 4.9a3.2 3.2 0 0 1 0 6.2M18.2 14.6c1.8.7 3 2.4 3.2 5.4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l8 4.5V4.5L7 9H4a1 1 0 0 0-1 1Z" />
      <path d="M7 15l1.5 5h2.5l-1-4.5M18.5 9.5a3.5 3.5 0 0 1 0 5" />
    </>
  ),
  trend: (
    <>
      <path d="M3 20.5h18M4.5 16l5-5 3.5 3.5 7-8" />
      <path d="M15 6.5h5v5" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.6l1.8 4.6-2.3 1.5a11 11 0 0 0 5.3 5.3l1.5-2.3 4.6 1.8V18a2.5 2.5 0 0 1-2.7 2.5C10.3 20 4 13.7 3.5 6.2A2.5 2.5 0 0 1 5 3.5z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.8 7 8.2 6.2L20.2 7" />
    </>
  ),
  chat: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.5L3.5 20.5 5 16A8.5 8.5 0 1 1 20.5 11.5z" />
      <path d="M9 9.5c.2 2.6 2.4 4.8 5.5 5.5l1.2-1.4-2-1-1 .6a4 4 0 0 1-1.8-1.8l.6-1-1-2z" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z" />
    </>
  ),
  facebook: <path d="M14 21v-8h2.7l.5-3.2H14V7.8c0-.9.4-1.6 1.7-1.6h1.6V3.3A18 18 0 0 0 15 3c-2.4 0-4 1.5-4 4.1v2.7H8.3V13H11v8z" />,
  pin: (
    <>
      <path d="M12 21.5s7-6 7-11.5a7 7 0 1 0-14 0c0 5.5 7 11.5 7 11.5z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  up: <path d="M12 19V5M6 11l6-6 6 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  left: <path d="m14.5 5-7 7 7 7" />,
  right: <path d="m9.5 5 7 7-7 7" />,
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  rotate3d: (
    <>
      <path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5" />
      <path d="m12 8.5 3 1.7v3.6l-3 1.7-3-1.7v-3.6z" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4 17 5.5-5 4 3.5 2.5-2.2L20.5 17" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
};

const Icon = ({ name, size = 24, className = "", ...rest }) => (
  <svg
    className={`icon ${className}`}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {paths[name]}
  </svg>
);

export default Icon;
