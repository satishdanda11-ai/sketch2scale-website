export type InsightTag = "All" | "Article" | "Framework" | "Research" | "Guide";

export interface Article {
  tag: Exclude<InsightTag, "All">;
  title: string;
  excerpt: string;
  reading: string;
  date: string;
  img: string;
  featured: boolean;
}

export const articles: Article[] = [
  {
    tag: "Framework",
    title: "The Six-S Method: How Structured Momentum Replaces Linear Process",
    excerpt: "Most engagement models are linear by necessity: discover, then design, then build, then launch. The problem with linearity is that it treats discovery as complete once the engagement begins, when in practice the best insights emerge mid-build.",
    reading: "8 min",
    date: "March 2025",
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=800&h=450&fit=crop&auto=format",
    featured: true,
  },
  {
    tag: "Research",
    title: "Business Design as Competitive Advantage: Evidence from 40 Transformations",
    excerpt: "Across 40 transformation engagements over three years, a consistent pattern emerged: organisations that integrated design into the strategic decision before it was made consistently outperformed those that brought design in after.",
    reading: "14 min",
    date: "February 2025",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=450&fit=crop&auto=format",
    featured: true,
  },
  {
    tag: "Article",
    title: "Why Strategy Without Design Stalls, and Design Without Strategy Decorates",
    excerpt: "There is a specific failure mode at the boundary between strategy and design consultancies: each does their part well, hands it over, and wonders why the outcome underdelivers. The answer is always sequencing.",
    reading: "5 min",
    date: "January 2025",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&auto=format",
    featured: true,
  },
  {
    tag: "Guide",
    title: "The Business Design Audit: 12 Questions Every Founder Should Ask Before Raising",
    excerpt: "A fundraise surfaces every weakness in your business positioning simultaneously. This guide provides the twelve diagnostic questions that separate founders who raise at valuation from those who don't.",
    reading: "12 min",
    date: "December 2024",
    img: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=450&fit=crop&auto=format",
    featured: false,
  },
  {
    tag: "Framework",
    title: "The Brand Architecture Decision: When to Unify, When to Separate",
    excerpt: "For organisations managing multiple sub-brands, the architecture decision — endorsed brand, house of brands, or hybrid — is one of the most consequential and least understood strategic choices.",
    reading: "9 min",
    date: "November 2024",
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=450&fit=crop&auto=format",
    featured: false,
  },
  {
    tag: "Research",
    title: "AI Adoption Patterns in Mid-Market Enterprises: What the Data Shows",
    excerpt: "A three-month research engagement with 28 mid-market enterprises revealed that the primary barrier to AI adoption was not technical capacity — it was the absence of a business use case vocabulary that non-technical stakeholders could hold.",
    reading: "18 min",
    date: "October 2024",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop&auto=format",
    featured: false,
  },
  {
    tag: "Article",
    title: "The Narrative Trap: Why Most Political Campaigns Speak to Supporters Instead of Persuadables",
    excerpt: "Campaigns optimise for applause and mistake enthusiasm for persuasion. The difference between a narrative that mobilises and one that converts is a structural question, not a creative one.",
    reading: "6 min",
    date: "September 2024",
    img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&auto=format",
    featured: false,
  },
  {
    tag: "Guide",
    title: "The Discovery Workshop Preparation Guide: How to Get the Most from Your First Session",
    excerpt: "A Discovery Workshop is a structured, single-session conversation with a defined output. The quality of that output depends more on how you arrive than on what happens during the session itself.",
    reading: "7 min",
    date: "August 2024",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&auto=format",
    featured: false,
  },
];

export const insightTags: InsightTag[] = ["All", "Article", "Framework", "Research", "Guide"];
