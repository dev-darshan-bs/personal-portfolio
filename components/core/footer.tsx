import { siteConfig } from "@/config/site";
import { classes } from "@/lib/style";
import styles from "./footer.module.css";
import { Link } from "./link";
import { Text } from "./text";

export const Footer = ({ className }: { className?: string }) => (
  <footer className={classes(styles.footer, className)}>
    <Text size="s" align="center">
      <span className={styles.date}>
        {`© ${new Date().getFullYear()} ${siteConfig.authorName}.`}
      </span>
      <Link secondary className={styles.link} href="/contact">
        Crafted by yours truly
      </Link>
    </Text>
  </footer>
);
