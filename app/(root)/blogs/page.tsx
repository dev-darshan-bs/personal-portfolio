import { Metadata } from "next";
import Script from "next/script";

import { Footer } from "@/components/core/footer";
import {
  EntryGrid,
  EntryPage,
  EntryRow,
  FeaturedEntry,
  SkeletonEntry,
} from "@/components/layouts/entry";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { BlogMeta, getAllBlogsMeta } from "@/lib/blogs";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.blogs.metadata.title,
  description: pagesConfig.blogs.metadata.description,
  alternates: {
    canonical: `${siteConfig.url}/blogs`,
  },
  openGraph: {
    title: `${pagesConfig.blogs.metadata.title} | ${siteConfig.name}`,
    description: pagesConfig.blogs.metadata.description,
    url: `${siteConfig.url}/blogs`,
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.authorName} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pagesConfig.blogs.metadata.title} | ${siteConfig.name}`,
    description: pagesConfig.blogs.metadata.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.username}`,
  },
};

function toEntry(blog: BlogMeta) {
  return {
    href: `/blogs/${blog.slug}`,
    label: formatDate(blog.date),
    title: blog.title,
    abstract: blog.description,
    cta: "Read article",
    meta: blog.readingTime ? `${blog.readingTime} min read` : undefined,
    tag: blog.tags[0],
    image: blog.coverImage
      ? { src: blog.coverImage, alt: blog.title, width: 1200, height: 630 }
      : undefined,
  };
}

export default function BlogsPage() {
  const blogs = getAllBlogsMeta();
  const featured = blogs.find((blog) => blog.featured) ?? blogs[0];
  const rest = blogs.filter((blog) => blog !== featured);
  const skeletonCount = Math.max(0, 2 - rest.length);

  // CollectionPage + Blog JSON-LD for the listing page
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${siteConfig.authorName} — Blog`,
    description: pagesConfig.blogs.metadata.description,
    url: `${siteConfig.url}/blogs`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
    mainEntity: {
      "@type": "Blog",
      name: `${siteConfig.authorName}'s Blog`,
      description: pagesConfig.blogs.metadata.description,
      url: `${siteConfig.url}/blogs`,
      author: {
        "@type": "Person",
        name: siteConfig.authorName,
        url: siteConfig.url,
      },
      blogPost: blogs.map((blog) => ({
        "@type": "BlogPosting",
        headline: blog.title,
        description: blog.description,
        datePublished: blog.date,
        url: `${siteConfig.url}/blogs/${blog.slug}`,
        author: {
          "@type": "Person",
          name: siteConfig.authorName,
        },
        keywords: blog.tags.join(", "),
        ...(blog.coverImage && {
          image: `${siteConfig.url}${blog.coverImage}`,
        }),
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: `${siteConfig.url}/blogs`,
      },
    ],
  };

  return (
    <EntryPage>
      <Script
        id="schema-blog-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />
      <Script
        id="schema-breadcrumb-blogs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <EntryGrid
        heading="Latest articles"
        featured={featured ? <FeaturedEntry {...toEntry(featured)} /> : undefined}
      >
        {rest.map((blog, index) => (
          <EntryRow key={blog.slug} index={index} {...toEntry(blog)} />
        ))}
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <SkeletonEntry key={index} index={rest.length + index} />
        ))}
      </EntryGrid>
      <Footer />
    </EntryPage>
  );
}
