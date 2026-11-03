import { Metadata } from "next";

import { Footer } from "@/components/core/footer";
import { EntryRow } from "@/components/layouts/entry";
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectTextRow,
} from "@/components/layouts/project";
import {
  ExperienceInterface,
  educationExperiences,
  workExperiences,
} from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { formatYearRange } from "@/lib/utils";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and education.`,
  keywords: [
    "experience timeline",
    "professional experience",
    "education",
    "software developer experience",
    "developer portfolio",
    "work experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

function sortByRecent(experiences: ExperienceInterface[]) {
  return [...experiences].sort((a, b) => {
    const dateA = a.endDate === "Present" ? new Date() : new Date(a.endDate);
    const dateB = b.endDate === "Present" ? new Date() : new Date(b.endDate);
    return dateB.getTime() - dateA.getTime();
  });
}

function toEntry(experience: ExperienceInterface) {
  return {
    href: `/experience/${experience.id}`,
    label: formatYearRange(experience.startDate, experience.endDate),
    title: experience.position,
    abstract: experience.description[0],
    cta: "View details",
    meta: `${experience.company} · ${experience.location}`,
  };
}

export default function ExperiencePage() {
  const work = sortByRecent(workExperiences);
  const education = sortByRecent(educationExperiences);

  return (
    <>
      <ProjectContainer>
        <ProjectHeader
          title={pagesConfig.experience.title}
          description={pagesConfig.experience.description}
          roles={[
            `${work.length} ${work.length === 1 ? "role" : "roles"}`,
            `${education.length} ${education.length === 1 ? "degree" : "degrees"}`,
            siteConfig.location,
          ]}
        />
        <ProjectSection padding="top" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l" justify="start">
              <ProjectSectionHeading level={4}>Work</ProjectSectionHeading>
              <div className={styles.list}>
                {work.map((experience, index) => (
                  <EntryRow key={experience.id} index={index} {...toEntry(experience)} />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="l" justify="start">
              <ProjectSectionHeading level={4}>Education</ProjectSectionHeading>
              <div className={styles.list}>
                {education.map((experience, index) => (
                  <EntryRow
                    key={experience.id}
                    index={work.length + index}
                    {...toEntry(experience)}
                  />
                ))}
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
