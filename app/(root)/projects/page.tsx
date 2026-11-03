import { Metadata } from "next";

import { Footer } from "@/components/core/footer";
import {
  EntryGrid,
  EntryPage,
  EntryRow,
  FeaturedEntry,
  SkeletonEntry,
} from "@/components/layouts/entry";
import { pagesConfig } from "@/config/pages";
import { ProjectInterface, Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { formatYearRange } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
  alternates: {
    canonical: `${siteConfig.url}/projects`,
  },
};

function toEntry(project: ProjectInterface) {
  return {
    href: `/projects/${project.id}`,
    label: formatYearRange(project.startDate, project.endDate),
    title: project.companyName,
    abstract: project.shortDescription,
    cta: "View project",
    meta: `${project.type} · ${project.category.join(", ")}`,
    tag: project.techStack[0],
    image: {
      src: project.companyLogoImg as string,
      alt: `${project.companyName} architecture overview`,
      width: 1400,
      height: 820,
    },
  };
}

export default function ProjectsPage() {
  const [featured, ...rest] = Projects;
  const skeletonCount = Math.max(0, 2 - rest.length);

  return (
    <EntryPage>
      <EntryGrid
        heading={pagesConfig.projects.title}
        featured={featured ? <FeaturedEntry {...toEntry(featured)} /> : undefined}
      >
        {rest.map((project, index) => (
          <EntryRow key={project.id} index={index} {...toEntry(project)} />
        ))}
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonEntry key={index} index={rest.length + index} />
        ))}
      </EntryGrid>
      <Footer />
    </EntryPage>
  );
}
