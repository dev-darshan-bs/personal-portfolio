# Darshan BS — Portfolio

Personal portfolio of Darshan BS, a backend engineer working on high-throughput
distributed systems (Java, Spring Boot, Apache Kafka, MySQL).

The visual design and page layouts are inspired by
[Hamish Williams' portfolio](https://github.com/HamishMW/portfolio): a dark,
monochrome interface with a cyan accent, a vertical side navigation, decoder-text
headings, a WebGL displacement sphere on the home page, and alternating project
summaries. The content (projects, experience, skills, contact details) is this
site's own.

## Tech stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack) with React 19 and TypeScript
- **Styling**: CSS Modules on top of a token system (`app/globals.css`), with Tailwind available for utilities
- **Motion**: CSS transitions driven by a small `Transition` helper, plus [Framer Motion](https://www.framer.com/motion/) springs
- **3D**: [three.js](https://threejs.org/) for the hero displacement sphere
- **Theming**: dark (default) and light via `next-themes` (`data-theme` attribute)
- **Analytics**: Google Analytics (optional) and Vercel Analytics
- **Deployment**: [Vercel](https://vercel.com)

## Getting started

1. Copy `.env.copy` to `.env` and fill in the values you need (all optional).
2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000).

## Where things live

| What                              | Where                                   |
| --------------------------------- | --------------------------------------- |
| Name, role, hero disciplines, links | `config/site.ts`                      |
| Side navigation links             | `config/routes.ts`                      |
| Social / contact icons            | `config/socials.ts`                     |
| Projects                          | `config/projects.ts`                    |
| Experience and education          | `config/experience.ts`                  |
| Skills                            | `config/skills.ts`                      |
| Page titles and descriptions      | `config/pages.ts`                       |
| Design tokens (colors, type, spacing) | `app/globals.css`                   |
| Core UI kit (heading, text, button, link, divider, decoder text, image, …) | `components/core/` |
| Side navbar, theme toggle         | `components/navbar/`                    |
| Home page sections                | `components/home/`                      |
| Project / detail page layout      | `components/layouts/project.tsx`        |
| List pages (projects, blogs, contributions) | `components/layouts/entry.tsx` |
| Blog posts (Markdown)             | `content/blogs/*.md`                    |

## Pages

- `/` — intro (displacement sphere + decoder text), three featured projects, profile
- `/projects`, `/projects/[id]` — project index and case-study style detail pages
- `/experience`, `/experience/[id]` — work and education
- `/skills` — skill cards with proficiency
- `/contact` — direct contact channels and resume link
- `/blogs`, `/blogs/[slug]` — Markdown articles (optional)
- `/contributions` — open-source contributions (optional)

## License

MIT — see [LICENSE](LICENSE). Design inspiration credited to Hamish Williams.
