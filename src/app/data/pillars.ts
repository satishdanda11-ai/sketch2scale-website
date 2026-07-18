export interface Pillar {
  id: string;
  n: string;
  label: string;
  tagline: string;
  purpose: string;
  problems: string[];
  ideal: string;
  value: string;
  example: string;
  connects: string[];
  connectSlugs: string[];
  img: string;
  heroImg: string;
}

export const pillars: Pillar[] = [
  {
    id: "business",
    n: "01",
    label: "Business",
    tagline: "What should this business become, and how does it get there?",
    purpose: "Transform ambiguous ideas and stalled companies into a clear, executable growth strategy.",
    problems: [
      "Unclear positioning and a confused market message",
      "Business models that hit a ceiling and cannot scale",
      "Growth that has plateaued without a clear cause",
      "Strategic decisions made without a coherent framework",
      "A positioning that invites comparison on price rather than value",
    ],
    ideal: "Founders pre- or post-funding, CEOs facing a plateau, business owners preparing to raise or expand into new markets.",
    value: "Reduces costly strategic missteps and aligns every subsequent design and technology decision to a validated business direction — so nothing is built on a contested premise.",
    example: "Repositioning a plateaued company ahead of a new funding round; defining a scalable business model for a founder moving from service to product.",
    connects: ["Product", "Startups", "Enterprise", "FinTech"],
    connectSlugs: ["product", "startups", "enterprise", "fintech"],
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&h=900&fit=crop&auto=format",
  },
  {
    id: "product",
    n: "02",
    label: "Product",
    tagline: "What should we build, and how does it stay usable as it scales?",
    purpose: "Transform strategy into experiences and platforms that people actually use and businesses can maintain as they grow.",
    problems: [
      "Products that are hard to use and drive silent churn",
      "Technology and design that were never designed as one system",
      "Roadmaps disconnected from the business strategy they should serve",
      "Platforms that require a rebuild every time the business changes",
      "First-version products that cannot absorb the next stage of growth",
    ],
    ideal: "Product leaders, founders building a first product, enterprises modernising a legacy platform.",
    value: "Reduces the cost of rebuilding later by designing usability and scalability together from the start — so the product grows with the business instead of against it.",
    example: "Designing and building a founder's first scalable platform; redesigning an enterprise system around real user workflows rather than legacy internal logic.",
    connects: ["Business", "Intelligence", "AI", "Enterprise", "FinTech"],
    connectSlugs: ["business", "intelligence", "ai", "enterprise", "fintech"],
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=900&fit=crop&auto=format",
  },
  {
    id: "brand",
    n: "03",
    label: "Brand",
    tagline: "What should this business stand for, and how is that felt everywhere?",
    purpose: "Transform how a business is perceived into an asset that compounds trust and recognition over time.",
    problems: [
      "Inconsistent identity across channels, touchpoints, and teams",
      "A brand that no longer reflects the ambition or scale of the business",
      "Market perception that lags behind actual capability",
      "An identity built for a previous stage that no longer fits the next one",
      "Creative decisions that cannot be defended with business logic",
    ],
    ideal: "CMOs, founders rebranding for a new stage, organisations expanding into new markets or industries.",
    value: "Creates a consistent, defensible market perception that supports every other pillar's work — from product adoption to audience growth — and compounds in value over time.",
    example: "Rebranding a scaling startup ahead of a new market entry; building a brand system for a first-time founder from zero.",
    connects: ["Stories", "Real Estate", "Entertainment", "Commerce"],
    connectSlugs: ["stories", "real-estate", "entertainment", "commerce"],
    img: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=1600&h=900&fit=crop&auto=format",
  },
  {
    id: "stories",
    n: "04",
    label: "Stories",
    tagline: "What story earns attention, trust, and belief?",
    purpose: "Transform what a business does into a narrative that earns attention, trust, and belief.",
    problems: [
      "Real capability that is not being communicated persuasively",
      "Campaigns without a coherent narrative throughline",
      "Content that does not build cumulative trust over time",
      "A fundraising story that does not compel the right investors",
      "Communication that costs money without compounding in value",
    ],
    ideal: "CMOs, political leaders, founders raising capital, organisations launching a new initiative publicly.",
    value: "Converts communication from a cost centre into a compounding trust-building asset — so every piece of content builds on the last rather than starting from zero.",
    example: "Building the narrative and campaign strategy behind a political initiative; developing a founder's fundraising story for a Series A raise.",
    connects: ["Influence", "Brand", "Political", "Entertainment", "Education"],
    connectSlugs: ["influence", "brand", "political", "entertainment", "education"],
    img: "https://images.unsplash.com/photo-1459369510627-9efbee1e6051?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=1600&h=900&fit=crop&auto=format",
  },
  {
    id: "influence",
    n: "05",
    label: "Influence",
    tagline: "How does this idea spread and gain followers who act?",
    purpose: "Transform an idea or a business into a following of people who act on its behalf.",
    problems: [
      "Low audience growth with no clear organic flywheel",
      "Community that does not translate into advocacy or action",
      "Movements without a structured growth strategy or architecture",
      "Attention that spikes around moments but does not compound",
      "Content investment that does not build a self-sustaining audience",
    ],
    ideal: "Political leaders, creator-driven businesses, organisations launching movements or public initiatives.",
    value: "Builds durable, self-sustaining audience growth rather than one-off attention spikes — so the following persists long after any individual campaign ends.",
    example: "Designing the growth strategy behind a public movement; building community architecture for a political campaign that mobilised 2.4 million people.",
    connects: ["Stories", "Government", "Political", "Entertainment"],
    connectSlugs: ["stories", "government", "political", "entertainment"],
    img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1600&h=900&fit=crop&auto=format",
  },
  {
    id: "intelligence",
    n: "06",
    label: "Intelligence",
    tagline: "Where does intelligence create unfair advantage?",
    purpose: "Transform business decisions and products through applied AI and data, creating advantages competitors cannot easily copy.",
    problems: [
      "Decisions made without adequate data infrastructure or feedback loops",
      "Manual processes that cannot scale without proportional headcount",
      "AI adopted as a buzzword rather than a genuine capability",
      "Technical AI capability without a clear business use case",
      "Automation that optimises the wrong things because the strategy is unclear",
    ],
    ideal: "AI-first companies, digital transformation leaders, enterprises seeking automation and data-informed decision-making.",
    value: "Creates durable, hard-to-replicate advantage by embedding intelligence into products and operations rather than bolting it on — so the advantage compounds rather than being quickly matched.",
    example: "Embedding AI-driven decisioning into an enterprise platform; automating a founder's operations to scale without proportional headcount increases.",
    connects: ["Product", "AI", "FinTech", "Healthcare"],
    connectSlugs: ["product", "ai", "fintech", "healthcare"],
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=500&fit=crop&auto=format",
    heroImg: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&h=900&fit=crop&auto=format",
  },
];

export function getPillar(id: string): Pillar | undefined {
  return pillars.find((p) => p.id === id);
}
