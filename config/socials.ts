import type { IconName } from "@/components/core/icon";
import { siteConfig } from "@/config/site";

export interface SocialInterface {
  name: string;
  username: string;
  icon: IconName;
  link: string;
}

const allSocials: SocialInterface[] = [
  {
    name: "GitHub",
    username: siteConfig.username,
    icon: "github",
    link: siteConfig.links.github,
  },
  {
    name: "LinkedIn",
    username: siteConfig.authorName,
    icon: "linkedin",
    link: siteConfig.links.linkedin,
  },
  {
    name: "Email",
    username: siteConfig.email,
    icon: "mail",
    link: `mailto:${siteConfig.email}`,
  },
  {
    name: "Phone",
    username: siteConfig.phone,
    icon: "phone",
    link: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
];

/** Socials with a configured link. Empty links are skipped. */
export const SocialLinks: SocialInterface[] = allSocials.filter(
  (social) => !!social.link
);
