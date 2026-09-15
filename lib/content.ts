/**
 * Static book content shown on the public landing page and the
 * companion (logged-in) area.
 *
 * Chapter numbers, titles and blurbs are transcribed from the actual
 * finished manuscript, `Applications_of_Agentic_AI_in_Financial_Mathematics.md`
 * (the project's authoritative source -- BOOK BIBLE.md is an earlier
 * planning draft whose chapter list it has since superseded: BOOK
 * BIBLE numbers Part II as five chapters ending at "07 -- Multi-Agent
 * Systems" and Part IV as 17-20, but the finished manuscript inserted
 * a new Chapter 06 ("Configuring the LLM for Reliable Agent
 * Behaviour"), which pushes MCP to 07, Multi-Agent Systems to 08, and
 * Part IV to 18-21. The numbering and titles below match the
 * manuscript, not the older draft.) Per CLAUDE.md's "do not
 * fabricate" rule, author credentials not yet on file are left blank
 * (TODO) rather than guessed.
 */

export type Depth = "concept" | "example" | "full" | "production";

export type Chapter = {
  number: number;
  slug: string;
  title: string;
  blurb: string;
  /**
   * What level of material this chapter's page should carry, per the
   * companion redesign: Part I is conceptual explanation only, Part
   * II adds example code, Part III goes all the way to math ->
   * Python -> tool -> agent, Part IV covers production guardrails /
   * evaluation code.
   */
  depth: Depth;
};

export type Part = {
  roman: string;
  title: string;
  blurb: string;
  chapters: Chapter[];
};

export const PARTS: Part[] = [
  {
    roman: "I",
    title: "Orientation",
    blurb: "Why the subject matters, and what a language model actually does.",
    chapters: [
      {
        number: 1,
        slug: "why-agentic-ai-why-now",
        title: "Why Agentic AI, Why Now",
        blurb:
          "Motivates why Financial Mathematics -- a discipline built on verifiable calculation -- needs to understand what AI agents actually do before trusting them.",
        depth: "concept",
      },
      {
        number: 2,
        slug: "what-an-llm-actually-does",
        title: "What an LLM Actually Does",
        blurb:
          "The mechanical foundation needed before encountering agents: tokens, embeddings, neural networks, transformers and attention, context, prompting, structured outputs, and tool calling.",
        depth: "concept",
      },
    ],
  },
  {
    roman: "II",
    title: "Agents",
    blurb:
      "The vocabulary and mechanics of agentic systems, built with general-purpose examples before any Financial Mathematics is involved.",
    chapters: [
      {
        number: 3,
        slug: "what-is-an-ai-agent",
        title: "What Is an AI Agent?",
        blurb:
          "Distinguishes an LLM, a chatbot, a tool-using LLM, and an agent, and introduces the Reason → Act → Observe → Repeat loop with non-financial examples.",
        depth: "example",
      },
      {
        number: 4,
        slug: "memory",
        title: "Memory",
        blurb:
          "Short-term (conversation) memory versus long-term (user) memory versus state management, their practical limits, and a demonstration in Agno.",
        depth: "example",
      },
      {
        number: 5,
        slug: "tools",
        title: "Tools",
        blurb:
          "The tool contract -- Input / Processing / Output / Validation -- that bridges a Python function to something an agent can call, including tool selection and validation via RetryAgentRun.",
        depth: "example",
      },
      {
        number: 6,
        slug: "configuring-the-llm-for-reliable-agent-behaviour",
        title: "Configuring the LLM for Reliable Agent Behaviour",
        blurb:
          "Model selection, temperature and sampling and their effect on tool-selection consistency, system instructions, and structured-output configuration -- closing on why consistency is not the same as correctness.",
        depth: "example",
      },
      {
        number: 7,
        slug: "composability-mcp",
        title: "Composability: MCP",
        blurb:
          "The M×N integration problem, MCP's host / client / server architecture and its tools / resources / prompts primitives, and connecting an Agno agent to a real MCP server.",
        depth: "example",
      },
      {
        number: 8,
        slug: "multi-agent-systems",
        title: "Multi-Agent Systems",
        blurb:
          "Why and how to split a broad tool set across specialist agents, Agno's Team (route / coordinate / broadcast modes) and Workflow, and the trade-offs against a single agent.",
        depth: "example",
      },
    ],
  },
  {
    roman: "III",
    title: "Actuarial Applications",
    blurb:
      "The core of the book: nine SOA Exam FM topics, each carried from formula to a working Agno agent.",
    chapters: [
      {
        number: 9,
        slug: "time-value-of-money",
        title: "Time Value of Money",
        blurb:
          "Fixes core TVM vocabulary and the equation of value, builds validated tools such as accumulated_value and present_value, and sets the concept → math → code → tool → agent pattern the rest of Part III follows.",
        depth: "full",
      },
      {
        number: 10,
        slug: "annuities",
        title: "Annuities",
        blurb:
          "Annuity-immediate and annuity-due, perpetuities, m-thly and continuous annuities, arithmetic and geometric annuities, and Newton-Raphson for solving an unknown rate.",
        depth: "full",
      },
      {
        number: 11,
        slug: "loans-and-amortisation",
        title: "Loans and Amortisation",
        blurb:
          "Treats a loan as an annuity viewed from the other side: outstanding balance by the prospective and retrospective methods, interest/principal decomposition, and amortisation schedules with drop or balloon payments.",
        depth: "full",
      },
      {
        number: 12,
        slug: "refinancing-and-capital-budgeting",
        title: "Refinancing and Capital Budgeting",
        blurb:
          "Composes the existing loan tools for refinancing decisions and covers NPV, IRR, comparing alternatives, and the multiple-IRR pitfall.",
        depth: "full",
      },
      {
        number: 13,
        slug: "bond-pricing",
        title: "Bond Pricing",
        blurb:
          "Derives the bond price formula as a coupon annuity plus a redemption lump sum, book value, premium/discount amortisation, and solving for yield.",
        depth: "full",
      },
      {
        number: 14,
        slug: "callable-bonds",
        title: "Callable Bonds",
        blurb:
          "Prices a callable bond to guarantee a minimum yield by checking every candidate call date, and shows where the common \"premium bonds are called early\" heuristic fails.",
        depth: "full",
      },
      {
        number: 15,
        slug: "duration-and-convexity",
        title: "Duration and Convexity",
        blurb:
          "Derives Macaulay and modified duration and convexity, and the first- and second-order approximations they give for a bond's price change.",
        depth: "full",
      },
      {
        number: 16,
        slug: "yield-curves-spot-and-forward-rates",
        title: "Yield Curves: Spot Rates and Forward Rates",
        blurb:
          "Generalises single-rate discounting to a full yield curve: the spot/forward rate relationship, and constructing a curve one maturity at a time.",
        depth: "full",
      },
      {
        number: 17,
        slug: "immunisation-and-asset-liability-management",
        title: "Immunisation and Asset-Liability Management",
        blurb:
          "Cash flow matching, Redington immunisation's three conditions, and full immunisation, built by composing Chapter 15's duration and convexity tools.",
        depth: "full",
      },
    ],
  },
  {
    roman: "IV",
    title: "Production",
    blurb:
      "What changes when an agentic application moves from a notebook experiment to something built to be relied on.",
    chapters: [
      {
        number: 18,
        slug: "architecture-and-comparative-stacks",
        title: "Architecture and Comparative Stacks",
        blurb:
          "The layered architecture behind an agentic application -- LLM, agent, tool, data, API, interface, observability -- shown as Agno's AgentOS: a REST API, a shared database, output_schema, and MCP-server exposure.",
        depth: "production",
      },
      {
        number: 19,
        slug: "evaluation",
        title: "Evaluation",
        blurb:
          "Separates deterministic regression testing of Part III's Python functions from ReliabilityEval-based evaluation of tool selection and trajectory, and builds an evaluation dataset targeting known ambiguities.",
        depth: "production",
      },
      {
        number: 20,
        slug: "guardrails-and-security",
        title: "Guardrails and Security",
        blurb:
          "Tool-level validation versus agent-level guardrails (pre_hooks, InputCheckError): prompt injection, a custom finance-topic guardrail, memory and iteration limits, and approval checkpoints -- closing on defence in depth.",
        depth: "production",
      },
      {
        number: 21,
        slug: "observability-and-deployment",
        title: "Observability and Deployment",
        blurb:
          "Agno's OpenTelemetry-based tracing, what to monitor -- trajectories, errors, latency, cost -- and deployment concerns: shared database, secrets, stateless workers, model-ID configuration.",
        depth: "production",
      },
    ],
  },
];

/** Flat lookup used by the chapter page route. */
export function findChapter(
  roman: string,
  slug: string
): { part: Part; chapter: Chapter } | undefined {
  const part = PARTS.find((p) => p.roman === roman);
  if (!part) return undefined;
  const chapter = part.chapters.find((c) => c.slug === slug);
  if (!chapter) return undefined;
  return { part, chapter };
}

export function findPart(roman: string): Part | undefined {
  return PARTS.find((p) => p.roman === roman);
}

// Transcribed from the manuscript's Foreword ("The philosophy behind
// this book") -- Applications_of_Agentic_AI_in_Financial_Mathematics.md
export const WHY_WHAT_HOW = {
  why: `When both stones of a grinding mill move, nothing can be ground effectively. For the grinding to happen, one stone must remain firm and steady, while the other rotates against it.

That is the philosophy behind this book. Trying to learn Financial Mathematics and Agentic AI at the same time can make the learning process unnecessarily difficult — it is moving both stones at once. We keep Financial Mathematics as the strong, stable foundation, and let Agentic AI be the rotating stone that moves across it.`,
  who: `Written for a reader who knows some Financial Mathematics — interest theory at the level of a first actuarial or finance course — and can write and run short Python programs. No experience with language models or agent frameworks is assumed.`,
  how: `Part I builds the minimum conceptual foundation needed before anything else makes sense — what a language model actually does. Part II introduces the vocabulary and mechanics of agentic systems using general-purpose examples, before any Financial Mathematics is involved: memory, tools, reliable configuration, composability through MCP, and multi-agent systems. Part III is the core of the book — across nine chapters, each one carries a Financial Mathematics topic from formula to a working Agno agent: concept, mathematics, worked examples, Python implementation, agentic application, and where the approach can fail. Part IV addresses what changes when an agentic application moves from a notebook experiment to something intended for real use — architecture, evaluation, guardrails, and observability.`,
};

export const BOOK_META = {
  title: "Applications of Agentic AI in Financial Mathematics",
  subtitle: "Building reliable AI agents for Financial Mathematics",
  imprint: "Sri Sathya Sai Institute of Actuaries · First Edition",
};

// Each author is linked to their LinkedIn profile.
export const AUTHORS: { name: string; linkedin: string }[] = [
  { name: "Kasyap KVS", linkedin: "https://www.linkedin.com/in/kkasyap/" },
  { name: "Satya Sai Mudigonda", linkedin: "https://www.linkedin.com/in/satya-sai-mudigonda/" },
  { name: "Sri Charan", linkedin: "https://www.linkedin.com/in/satya-sai-sri-charan-wootla-572482202/" },
  { name: "Rohan Yashraj", linkedin: "https://www.linkedin.com/in/rohanyashraj/" },
];
