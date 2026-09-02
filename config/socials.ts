import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";

interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = [
  {
    name: "Gmail",
    username: siteConfig.email,
    icon: Icons.gmail,
    link: `mailto:${siteConfig.email}`,
  },
  {
    name: "Phone",
    username: siteConfig.phone,
    icon: Icons.contact,
    link: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
];
