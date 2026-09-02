import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import { contributionsUnsorted } from "@/config/contributions";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
};

export default function ContributonsPage() {
  return (
    <PageContainer
      title={pagesConfig.contributions.title}
      description={pagesConfig.contributions.description}
    >
      {contributionsUnsorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No public contributions listed yet
          </h3>
          <p className="text-muted-foreground text-sm">
            I currently focus on production backend systems at DTDC Express.
          </p>
        </div>
      ) : (
        <ContributionCard contributions={contributionsUnsorted} />
      )}
    </PageContainer>
  );
}
