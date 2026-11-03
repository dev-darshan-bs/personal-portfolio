import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { Post } from "@/components/layouts/post";
import { siteConfig } from "@/config/site";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    const ogImage = post.coverImage
      ? `${siteConfig.url}${post.coverImage}`
      : siteConfig.ogImage;

    return {
      title: post.title,
      description: post.description,
      authors: [{ name: siteConfig.authorName, url: siteConfig.url }],
      keywords: post.tags,
      alternates: {
        canonical: `${siteConfig.url}/blogs/${slug}`,
      },
      openGraph: {
        title: post.title,
        description: post.description,
        url: `${siteConfig.url}/blogs/${slug}`,
        siteName: siteConfig.name,
        type: "article",
        publishedTime: post.date,
        modifiedTime: post.date,
        authors: [siteConfig.authorName],
        tags: post.tags,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [ogImage],
        creator: `@${siteConfig.username}`,
      },
      robots: {
        index: true,
        follow: true,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    };
  } catch {
    return { title: "Blog Post Not Found" };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  let post;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  const isoDate = new Date(post.date).toISOString();
  const ogImage = post.coverImage
    ? `${siteConfig.url}${post.coverImage}`
    : siteConfig.ogImage;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: isoDate,
    dateModified: isoDate,
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
      sameAs: [siteConfig.links.github, siteConfig.links.twitter].filter(Boolean),
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}/blogs/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blogs/${slug}`,
    },
    image: ogImage,
    keywords: post.tags.join(", "),
    wordCount: post.contentHtml.replace(/<[^>]*>/g, "").split(/\s+/).length,
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`,
    }),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "Blog",
      name: `${siteConfig.authorName}'s Blog`,
      url: `${siteConfig.url}/blogs`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${siteConfig.url}/blogs/${slug}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="schema-blog-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
      <Script
        id="schema-breadcrumb-post"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Post
        title={post.title}
        date={post.date}
        banner={post.coverImage}
        readingTime={post.readingTime}
        tags={post.tags}
      >
        <section
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </Post>
    </>
  );
}
