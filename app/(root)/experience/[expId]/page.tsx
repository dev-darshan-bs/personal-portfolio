import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/core/button";
import { Footer } from "@/components/core/footer";
import { List, ListItem } from "@/components/core/list";
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTags,
  ProjectTextRow,
} from "@/components/layouts/project";
import { experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";
import { formatDateRange } from "@/lib/utils";

interface ExperienceDetailPageProps {
  params: Promise<{
    expId: string;
  }>;
}

export function generateStaticParams() {
  return experiences.map((experience) => ({ expId: experience.id }));
}

export async function generateMetadata({
  params,
}: ExperienceDetailPageProps): Promise<Metadata> {
  const { expId } = await params;
  const experience = experiences.find((c) => c.id === expId);

  if (!experience) {
    return {
      title: "Experience Not Found",
    };
  }

  return {
    title: `${experience.position} at ${experience.company} | Experience`,
    description: `Detailed information about my role as ${experience.position} at ${experience.company}.`,
    alternates: {
      canonical: `${siteConfig.url}/experience/${expId}`,
    },
  };
}

export default async function ExperienceDetailPage({
  params,
}: ExperienceDetailPageProps) {
  const { expId } = await params;
  const experience = experiences.find((c) => c.id === expId);

  if (!experience) {
    notFound();
  }

  const roles = [
    experience.company,
    experience.location,
    formatDateRange(experience.startDate, experience.endDate),
    experience.kind === "education" ? "Degree" : "Full-time",
  ];

  return (
    <>
      <ProjectContainer>
        <ProjectHeader
          title={experience.position}
          description={experience.description[0]}
          url={experience.companyUrl}
          linkLabel={experience.kind === "education" ? "Visit institute" : "Visit company"}
          roles={roles}
        />
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>
              {experience.kind === "education" ? "Studies" : "The role"}
            </ProjectSectionHeading>
            {experience.description.map((paragraph, index) => (
              <ProjectSectionText key={index}>{paragraph}</ProjectSectionText>
            ))}
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectTextRow justify="start" width="m">
              <ProjectSectionHeading>
                {experience.kind === "education" ? "Highlights" : "Key achievements"}
              </ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  {experience.achievements.map((achievement, index) => (
                    <ListItem key={index}>{achievement}</ListItem>
                  ))}
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow justify="start" width="s">
              <ProjectSectionHeading>Technologies</ProjectSectionHeading>
              <ProjectTags tags={experience.skills} />
              <ProjectSectionText>
                The primary technologies and skills I used during my time at{" "}
                {experience.company}.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection padding="both">
          <ProjectTextRow center>
            <Button secondary iconHoverShift icon="arrow-left" href="/experience">
              All experience
            </Button>
          </ProjectTextRow>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
