import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/core/button";
import { Footer } from "@/components/core/footer";
import { List, ListItem } from "@/components/core/list";
import {
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTags,
  ProjectTextRow,
} from "@/components/layouts/project";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { formatDateRange } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export function generateStaticParams() {
  return Projects.map((project) => ({ projectId: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: `${project.companyName} | Projects`,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/projects/${projectId}`,
    },
  };
}

export default async function Project({ params }: ProjectPageProps) {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);

  if (!project) {
    notFound();
  }

  const roles = [
    formatDateRange(project.startDate, project.endDate),
    `${project.type} · ${project.category.join(", ")}`,
  ];

  const heroImage = project.companyLogoImg as string;

  return (
    <>
      <ProjectContainer>
        <ProjectHeader
          title={project.companyName}
          description={project.shortDescription}
          url={project.websiteLink || project.githubLink}
          linkLabel={project.websiteLink ? "Visit website" : "View source"}
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              raised
              priority
              src={heroImage}
              width={1400}
              height={820}
              sizes="(max-width: 696px) 100vw, (max-width: 1040px) 800px, 1000px"
              alt={`${project.companyName} architecture diagram`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectTextRow>
            <ProjectSectionHeading>Overview</ProjectSectionHeading>
            {project.descriptionDetails.paragraphs.map((paragraph, index) => (
              <ProjectSectionText key={index}>{paragraph}</ProjectSectionText>
            ))}
          </ProjectTextRow>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns>
            <ProjectTextRow justify="start" width="m">
              <ProjectSectionHeading>Highlights</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  {project.descriptionDetails.bullets.map((bullet, index) => (
                    <ListItem key={index}>{bullet}</ListItem>
                  ))}
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow justify="start" width="s">
              <ProjectSectionHeading>Tech stack</ProjectSectionHeading>
              <ProjectTags tags={project.techStack} />
            </ProjectTextRow>
          </ProjectSectionColumns>
        </ProjectSection>
        {project.pagesInfoArr.map((page, index) => (
          <ProjectSection key={index} padding={index === 0 ? "both" : "bottom"}>
            <ProjectSectionContent>
              <ProjectTextRow>
                <ProjectSectionHeading>{page.title}</ProjectSectionHeading>
                {page.description && (
                  <ProjectSectionText>{page.description}</ProjectSectionText>
                )}
              </ProjectTextRow>
              {page.imgArr
                .filter((img) => img !== heroImage)
                .map((img, imgIndex) => (
                  <ProjectImage
                    key={imgIndex}
                    src={img}
                    width={1400}
                    height={820}
                    sizes="(max-width: 696px) 100vw, (max-width: 1040px) 800px, 1000px"
                    alt={`${page.title} — ${project.companyName}`}
                  />
                ))}
            </ProjectSectionContent>
          </ProjectSection>
        ))}
        <ProjectSection padding="bottom">
          <ProjectTextRow center>
            <Button secondary iconHoverShift icon="arrow-left" href="/projects">
              All projects
            </Button>
          </ProjectTextRow>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
