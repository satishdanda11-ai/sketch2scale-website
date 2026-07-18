export type PillarFilter = "All" | "Business" | "Product" | "Brand" | "Stories" | "Influence" | "Intelligence";

export interface ResultMetric {
  n: string;
  label: string;
}

export interface CaseStudy {
  pillar: Exclude<PillarFilter, "All">;
  industry: string;
  outcome: string;
  challenge: string;
  approach: string;
  transformation: string;
  resultMetrics: ResultMetric[];
  img: string;
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    pillar: "Product",
    industry: "FinTech",
    outcome: "A FinTech platform rebuilt for trust — adoption increased 340% in six months",
    challenge: "A challenger bank's onboarding experience was built by engineers, not for people. 68% of users abandoned before their first transaction. The product worked; the experience made it feel like it didn't.",
    approach: "Six-S Method, stages 1–5. Discovery revealed the real barrier was not the UX — it was the absence of trust signals at the moment a user was asked to enter financial information. We redesigned around the trust arc, not the task flow.",
    transformation: "A complete product redesign anchored in progressive trust: each interaction earned the right to ask for the next piece of information. The visual system was rebuilt to feel regulated and confident — not like a challenger trying to seem trustworthy.",
    resultMetrics: [
      { n: "340%", label: "increase in successful onboarding" },
      { n: "68%", label: "reduction in abandonment rate" },
      { n: "4.2×", label: "growth in monthly active users" },
    ],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop&auto=format",
    featured: true,
  },
  {
    pillar: "Business",
    industry: "Startups",
    outcome: "A scaling startup repositioned ahead of Series A — fund secured within 90 days",
    challenge: "A B2B SaaS founder had a working product and a growing customer base but could not articulate what the company was, who it was for, or why it would win. Three investor conversations had ended with 'we don't quite understand the business.'",
    approach: "Discover through Strategize. We ran a two-day positioning sprint with the founding team, synthesising customer evidence, competitive landscape, and the business's genuine unfair advantages into a positioning framework the investors could hold.",
    transformation: "A documented business strategy — positioning statement, category definition, growth architecture — that the founder could defend in every conversation. The fundraise restarted on a repositioned thesis and closed within a quarter.",
    resultMetrics: [
      { n: "90", label: "days from repositioning to close" },
      { n: "Series A", label: "round secured at target valuation" },
      { n: "3", label: "strategic categories clarified" },
    ],
    img: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=500&fit=crop&auto=format",
    featured: true,
  },
  {
    pillar: "Stories",
    industry: "Political",
    outcome: "A political campaign's narrative strategy built from the ground up — 2.4M audience mobilised",
    challenge: "A regional political initiative had conviction and a genuine policy proposition but no narrative infrastructure. Supporters could not explain it in one sentence. Media coverage was thin and surface-level. Momentum existed in rooms; it did not survive those rooms.",
    approach: "Stories and Influence pillars, stages 3–6. We built a narrative framework that gave the movement a clear throughline — not a slogan, but a story with a protagonist, an antagonist, and a resolution that audiences could own and repeat.",
    transformation: "A complete narrative architecture: the founding story, the argument structure, the visual vocabulary, and the content system for the campaign's full run. Supporters became advocates because the story was simple enough to carry.",
    resultMetrics: [
      { n: "2.4M", label: "audience mobilised across platforms" },
      { n: "11×", label: "increase in organic story shares" },
      { n: "84%", label: "supporter message recall in exit surveys" },
    ],
    img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=500&fit=crop&auto=format",
    featured: true,
  },
  {
    pillar: "Brand",
    industry: "Enterprise",
    outcome: "A global consulting firm's brand rebuilt for its next decade of growth — 12 markets, one coherent identity",
    challenge: "A 30-year-old consulting firm had grown through acquisition. Twelve regional offices operated with twelve visual dialects. The brand had the credibility of tenure but lacked the coherence of ambition.",
    approach: "Brand pillar, stages 1–5. We began by auditing the full estate of brand expressions — a significant discovery effort — then built a system that could hold consistency at scale without erasing the regional character that made the firm trusted locally.",
    transformation: "A unified brand architecture with a global identity system, a design language adaptable to twelve regional contexts, and an internal roll-out programme that embedded the system into every practice area.",
    resultMetrics: [
      { n: "12", label: "regional offices unified under one system" },
      { n: "6mo", label: "full roll-out completed" },
      { n: "94%", label: "internal adoption rate at 90 days" },
    ],
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&auto=format",
    featured: false,
  },
  {
    pillar: "Intelligence",
    industry: "AI",
    outcome: "An AI platform redesigned for a non-technical market — commercial pipeline doubled in one quarter",
    challenge: "A machine learning infrastructure company had built genuinely impressive technology. Their go-to-market positioned them as a deeply technical product for deeply technical buyers. The commercial opportunity in adjacent, less technical markets was being missed because nothing about the product or the narrative spoke to non-engineers.",
    approach: "Intelligence and Product pillars, stages 2–5. We translated the technical architecture into a business-outcomes vocabulary, rebuilt the product experience for non-technical users, and created a narrative framework that made the underlying capability feel accessible without making it feel less credible.",
    transformation: "A repositioned product with two distinct entry points — technical and commercial — sharing a coherent brand and a narrative that worked for both audiences. The commercial pipeline more than doubled in the first quarter after launch.",
    resultMetrics: [
      { n: "2.1×", label: "pipeline growth in Q1 post-launch" },
      { n: "3", label: "new industry verticals opened" },
      { n: "−62%", label: "reduction in sales cycle length" },
    ],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop&auto=format",
    featured: false,
  },
];

export const pillarFilters: PillarFilter[] = ["All", "Business", "Product", "Brand", "Stories", "Influence", "Intelligence"];
