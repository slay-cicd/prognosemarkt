import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;        // Formatted display date (de-DE)
  rawDate: string;     // ISO date string for sorting / sitemap
  excerpt: string;
  tags?: string[];
  author?: string;
  readingTime: number;
  featured?: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.(md|mdx)$/, "");
    const filePath = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const rawDate = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
    return {
      slug,
      title: data.title || slug,
      date: formatDate(rawDate),
      rawDate,
      excerpt:
        data.excerpt ||
        content
          .replace(/#+\s/g, "")
          .replace(/\*\*/g, "")
          .trim()
          .slice(0, 160) + "...",
      tags: data.tags || [],
      author: data.author || "Redaktion",
      readingTime: estimateReadingTime(content),
      featured: data.featured || false,
    } satisfies PostMeta;
  });

  // Sort by date desc, featured first
  return posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime();
  });
}

export function getFeaturedPost(): PostMeta | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const extensions = [".md", ".mdx"];

  let filePath: string | null = null;
  for (const ext of extensions) {
    const candidate = path.join(POSTS_DIR, `${slug}${ext}`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  const htmlContent = processed.toString();

  const rawDate = data.date ? new Date(data.date).toISOString() : new Date().toISOString();
  return {
    slug,
    title: data.title || slug,
    date: formatDate(rawDate),
    rawDate,
    excerpt:
      data.excerpt ||
      content.replace(/#+\s/g, "").trim().slice(0, 160) + "...",
    tags: data.tags || [],
    author: data.author || "Redaktion",
    readingTime: estimateReadingTime(content),
    featured: data.featured || false,
    content: htmlContent,
  };
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => f.replace(/\.(md|mdx)$/, ""));
}
