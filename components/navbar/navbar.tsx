"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, RefObject, useEffect, useState } from "react";

import { Icon } from "@/components/core/icon";
import { Monogram } from "@/components/core/monogram";
import { Transition } from "@/components/core/transition";
import { navLinks } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/config/socials";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useWindowSize } from "@/hooks/use-window-size";
import { cssProps, durations, media, numToMs } from "@/lib/style";
import { NavToggle } from "./nav-toggle";
import styles from "./navbar.module.css";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const [current, setCurrent] = useState<string>();
  const [menuOpen, setMenuOpen] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const pathname = usePathname();
  const windowSize = useWindowSize();
  const isMobile = windowSize.width <= media.mobile || windowSize.height <= 696;
  const scrollToHash = useScrollToHash();

  useEffect(() => {
    // Prevent ssr mismatch by storing this in state
    setCurrent(`${pathname}${window.location.hash}`);
  }, [pathname]);

  // Handle smooth scroll nav items
  useEffect(() => {
    if (!target || pathname !== "/") return;
    setCurrent(`${pathname}${target}`);
    scrollToHash(target, () => setTarget(null));
  }, [pathname, scrollToHash, target]);

  // Close the mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Check if a nav item should be active
  const getCurrent = (url = "") => {
    const nonTrailing = current?.endsWith("/") ? current?.slice(0, -1) : current;

    if (url === nonTrailing || (url !== "/" && nonTrailing?.startsWith(`${url}/`))) {
      return "page";
    }

    return undefined;
  };

  // Store the current hash to scroll to
  const handleNavItemClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = event.currentTarget.href.split("#")[1];
    setTarget(null);

    if (hash && pathname === "/") {
      setTarget(`#${hash}`);
      event.preventDefault();
    }
  };

  const handleMobileNavClick = (event: MouseEvent<HTMLAnchorElement>) => {
    handleNavItemClick(event);
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header className={styles.navbar}>
      <Link
        href={pathname === "/" ? "/#intro" : "/"}
        data-navbar-item
        className={styles.logo}
        aria-label={`${siteConfig.authorName}, ${siteConfig.jobTitle}`}
        onClick={handleMobileNavClick}
      >
        <Monogram highlight />
      </Link>
      <NavToggle onClick={() => setMenuOpen(!menuOpen)} menuOpen={menuOpen} />
      <nav className={styles.nav}>
        <div className={styles.navList}>
          {navLinks.map(({ label, pathname: href }) => (
            <Link
              href={href}
              key={label}
              data-navbar-item
              className={styles.navLink}
              aria-current={getCurrent(href)}
              onClick={handleNavItemClick}
            >
              {label}
            </Link>
          ))}
        </div>
        <NavbarIcons desktop />
      </nav>
      <Transition unmount in={menuOpen} timeout={durations.l}>
        {({ visible, nodeRef }) => (
          <nav
            className={styles.mobileNav}
            data-visible={visible}
            ref={nodeRef as RefObject<HTMLElement>}
          >
            {navLinks.map(({ label, pathname: href }, index) => (
              <Link
                href={href}
                key={label}
                className={styles.mobileNavLink}
                data-visible={visible}
                aria-current={getCurrent(href)}
                onClick={handleMobileNavClick}
                style={cssProps({
                  transitionDelay: numToMs(durations.s + index * 50),
                })}
              >
                {label}
              </Link>
            ))}
            <NavbarIcons />
            <ThemeToggle isMobile />
          </nav>
        )}
      </Transition>
      {!isMobile && <ThemeToggle data-navbar-item />}
    </header>
  );
};

const NavbarIcons = ({ desktop }: { desktop?: boolean }) => (
  <div className={styles.navIcons}>
    {SocialLinks.map(({ name, link, icon }) => (
      <a
        key={name}
        data-navbar-item={desktop || undefined}
        className={styles.navIconLink}
        aria-label={name}
        href={link}
        target={link.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
      >
        <Icon className={styles.navIcon} icon={icon} />
      </a>
    ))}
  </div>
);
