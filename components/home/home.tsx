"use client";

import { RefObject, useEffect, useRef, useState } from "react";

import { Footer } from "@/components/core/footer";
import type { ProjectInterface } from "@/config/projects";
import styles from "./home.module.css";
import { Intro } from "./intro";
import { Profile } from "./profile";
import { ProjectSummary } from "./project-summary";

type HomeProps = {
  projects: ProjectInterface[];
};

export const Home = ({ projects }: HomeProps) => {
  const [visibleSections, setVisibleSections] = useState<Element[]>([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef<HTMLElement>(null);
  const projectOne = useRef<HTMLElement>(null);
  const projectTwo = useRef<HTMLElement>(null);
  const projectThree = useRef<HTMLElement>(null);
  const details = useRef<HTMLElement>(null);
  const projectRefs = [projectOne, projectTwo, projectThree];

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections((prevSections) => [...prevSections, section]);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: "-100% 0px 0px 0px" }
    );

    sections.forEach((section) => {
      if (section.current) sectionObserver.observe(section.current);
    });

    if (intro.current) indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  const isVisible = (ref: RefObject<HTMLElement | null>) =>
    !!ref.current && visibleSections.includes(ref.current);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      {projects.slice(0, 3).map((project, index) => (
        <ProjectSummary
          key={project.id}
          id={`project-${index + 1}`}
          alternate={index % 2 === 1}
          sectionRef={projectRefs[index]}
          visible={isVisible(projectRefs[index])}
          index={index + 1}
          title={project.companyName}
          description={project.shortDescription}
          buttonText="View project"
          buttonLink={`/projects/${project.id}`}
          image={{
            src: project.companyLogoImg,
            alt: `${project.companyName} architecture overview`,
          }}
        />
      ))}
      <Profile sectionRef={details} visible={isVisible(details)} id="details" />
      <Footer />
    </div>
  );
};
