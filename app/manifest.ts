import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Darshan BS | Backend Engineer",
    short_name: "Darshan BS",
    description:
      "Darshan BS - Backend Engineer specializing in high-throughput distributed systems with Java, Spring Boot, Apache Kafka, and MySQL.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "64x64",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: [
      "portfolio",
      "backend",
      "software engineering",
      "java",
      "developer",
    ],
    lang: "en",
    dir: "ltr",
    scope: "/",
  };
}
