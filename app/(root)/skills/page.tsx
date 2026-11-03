import { Metadata } from "next";

import { Footer } from "@/components/core/footer";
import { Heading } from "@/components/core/heading";
import { Text } from "@/components/core/text";
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
} from "@/components/layouts/project";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { skills } from "@/config/skills";
import { cssProps } from "@/lib/style";
import styles from "./skills.module.css";

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.metadata.description,
  alternates: {
    canonical: `${siteConfig.url}/skills`,
  },
};

const ratingLabels: Record<number, string> = {
  5: "Expert",
  4: "Advanced",
  3: "Working",
  2: "Familiar",
  1: "Learning",
};

export default function SkillsPage() {
  const expert = skills.filter((skill) => skill.rating >= 5).length;

  return (
    <>
      <ProjectContainer>
        <ProjectHeader
          title={pagesConfig.skills.title}
          description={pagesConfig.skills.description}
          roles={[
            `${skills.length} skills`,
            `${expert} at expert level`,
            "Java · Spring · Kafka",
          ]}
        />
        <ProjectSection padding="both">
          <ProjectSectionContent>
            <ul className={styles.grid}>
              {skills.map((skill, index) => (
                <li
                  key={skill.name}
                  className={styles.card}
                  style={cssProps({ delay: 400 + index * 80 })}
                >
                  <div className={styles.cardHeader}>
                    <skill.icon className={styles.icon} size={32} aria-hidden />
                    <span className={styles.ratingLabel}>
                      {ratingLabels[skill.rating] ?? ""}
                    </span>
                  </div>
                  <Heading level={5} as="h2" className={styles.name}>
                    {skill.name}
                  </Heading>
                  <Text size="s" as="p" className={styles.description}>
                    {skill.description}
                  </Text>
                  <div
                    className={styles.rating}
                    role="img"
                    aria-label={`${skill.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={styles.ratingBar}
                        data-filled={i < skill.rating}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
