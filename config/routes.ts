export interface NavLink {
  label: string;
  pathname: string;
}

export const navLinks: NavLink[] = [
  { label: "Projects", pathname: "/projects" },
  { label: "Experience", pathname: "/experience" },
  { label: "Skills", pathname: "/skills" },
  { label: "Contact", pathname: "/contact" },
];
