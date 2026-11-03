import { Metadata } from "next";

import { Footer } from "@/components/core/footer";
import {
  EntryGrid,
  EntryPage,
  EntryRow,
  SkeletonEntry,
} from "@/components/layouts/entry";
import { contributionsUnsorted } from "@/config/contributions";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
  alternates: {
    canonical: `${siteConfig.url}/contributions`,
  },
};

export default function ContributionsPage() {
  const skeletonCount = Math.max(0, 2 - contributionsUnsorted.length);

  return (
    <EntryPage>
      <EntryGrid heading={pagesConfig.contributions.title}>
        {contributionsUnsorted.map((contribution, index) => (
          <EntryRow
            key={contribution.link}
            index={index}
            href={contribution.link}
            label={contribution.repoOwner}
            title={contribution.repo}
            abstract={contribution.contibutionDescription}
            cta="View contribution"
          />
        ))}
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonEntry
            key={index}
            index={contributionsUnsorted.length + index}
            label={index === 0 ? "Focused on production work at DTDC" : "Coming soon..."}
          />
        ))}
      </EntryGrid>
      <Footer />
    </EntryPage>
  );
}
