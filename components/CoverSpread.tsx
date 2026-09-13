import { AUTHORS, BOOK_META, PARTS } from "@/lib/content";

/**
 * Full-bleed reproduction of the approved book cover artwork (back
 * panel, spine, front panel) as the landing page's hero. Ported
 * faithfully from the original cover design's markup/colors -- same
 * oklch palette, same "lattice" agent-loop graphic, same layout ratios
 * (back:spine:front = 600:45:600 in the source) -- with two
 * deliberate omissions: the ISBN barcode placeholder and print bleed
 * marks, both print-production details with no place on a live site.
 *
 * Responsive strategy: at desktop widths the three panels sit side by
 * side exactly as on the physical dust jacket. Below 760px there isn't
 * room to do that and keep any of it legible, so the panels stack
 * (front first, since that's the cover people actually recognize) at
 * full width instead of squeezing a landscape spread into a portrait
 * screen.
 */
export default function CoverSpread() {
  return (
    <div className="cover-spread">
      <BackPanel />
      <Spine />
      <FrontPanel />
    </div>
  );
}

function BackPanel() {
  return (
    <div className="cs-back">
      <div className="cs-rule" />
      <div className="cs-eyebrow">Financial Mathematics &middot; Applied AI</div>

      <div className="cs-back-copy">
        <p className="cs-back-lede">
          A financial model is a chain of judgements. An agent can be taught to hold that chain.
        </p>
        <p>
          The book moves from the mechanics of language models to the architecture of agents — tools,
          memory, orchestration, and composability — and grounds every idea in the mathematics of
          financial theory. Each concept is built twice, once as a formula and once as code, using Python
          and Agno throughout.
        </p>
        <p>
          By the final chapter, the reader will have designed, tested, and deployed a working agentic
          system — one that reasons about a financial question, selects the correct calculation, and
          explains its answer with the same rigor an actuary would demand. This book is a guide for
          anyone ready to think computationally about financial mathematics, and agentically about AI.
        </p>
      </div>

      <div className="cs-parts-label">
        <div className="cs-eyebrow" style={{ marginBottom: 4 }}>
          Four parts
        </div>
        <div>{PARTS.map((p) => p.title).join(" · ")}</div>
      </div>

      <div className="cs-back-foot">
        <img src="/sssia-seal.jpg" alt="Sri Sathya Sai Institute of Actuaries" />
        <div className="cs-back-foot-name">
          Sri Sathya Sai
          <br />
          Institute of Actuaries
        </div>
      </div>
    </div>
  );
}

function Spine() {
  return (
    <div className="cs-spine">
      <div className="cs-spine-dot" />
      <div className="cs-spine-title">{BOOK_META.title}</div>
      <div className="cs-spine-imprint">SSSIA</div>
    </div>
  );
}

function FrontPanel() {
  return (
    <div className="cs-front">
      <div className="cs-front-top">
        <div className="cs-rule" />
        <div className="cs-front-topline">
          <span>Sri Sathya Sai Institute of Actuaries</span>
          <span style={{ opacity: 0.6 }}>2026</span>
        </div>
      </div>

      <div className="cs-front-title">
        <h1>
          Applications of
          <br />
          Agentic AI
          <br />
          <em>in Financial
          <br />
          Mathematics</em>
        </h1>
        <div className="cs-title-rule" />
        <p>{BOOK_META.subtitle}.</p>
      </div>

      <AgentField />

      <div className="cs-front-foot">
        <div className="cs-front-authors">
          <span>{AUTHORS[0]?.name} &middot; {AUTHORS[1]?.name}</span>
          <span>{AUTHORS[2]?.name} &middot; {AUTHORS[3]?.name}</span>
        </div>
        <span style={{ opacity: 0.6 }}>First edition</span>
      </div>
    </div>
  );
}

/** The cover's signature graphic: four small FM-instrument sketches on
 * the left feeding into the agent Reason/Act/Observe loop on the
 * right, on a dotted field. */
function AgentField() {
  return (
    <div className="cs-agent-field">
      <div className="cs-instrument-grid">
        <Instrument label="SI · CI">
          <path d="M2 56 L2 2" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 56 L98 56" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 54 L96 22" />
          <path d="M2 54 C40 52 74 40 96 6" stroke="oklch(0.80 0.09 195)" />
        </Instrument>
        <Instrument label="i, d → δ">
          <path d="M2 56 L2 2" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 56 L98 56" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 30 L98 30" stroke="oklch(0.80 0.02 60)" strokeWidth={1} strokeDasharray="3 3" />
          <path d="M6 52 C40 51 66 41 96 33" stroke="oklch(0.78 0.14 70)" />
          <path d="M6 8 C40 9 66 19 96 27" stroke="oklch(0.72 0.09 195)" />
        </Instrument>
        <Instrument label="AMORTISATION">
          <path d="M2 56 L2 2" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 56 L98 56" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M6 8 L6 26 L22 12 L22 30 L38 16 L38 34 L54 22 L54 40 L70 30 L70 46 L86 40 L86 56" />
        </Instrument>
        <Instrument label="IMMUNISATION">
          <path d="M2 56 L2 2" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M2 56 L98 56" stroke="oklch(0.64 0.025 60)" strokeWidth={1} />
          <path d="M4 6 C26 38 52 50 96 52" />
          <path d="M4 16 C30 44 58 52 96 54" stroke="oklch(0.68 0.03 195)" />
        </Instrument>
      </div>

      <div className="cs-transfer">
        <span className="cs-transfer-dot" />
        <span className="cs-transfer-line" />
        <span className="cs-transfer-arrow" />
      </div>

      <div className="cs-agent-loop">
        <div className="cs-loop-ring" />
        <span className="cs-loop-node cs-loop-node-top" />
        <span className="cs-loop-node cs-loop-node-left" />
        <span className="cs-loop-node cs-loop-node-right" />
        <div className="cs-loop-memory">
          <div className="cs-loop-memory-label">MEMORY</div>
          <div className="cs-loop-memory-bar" />
          <div className="cs-loop-memory-bar" />
          <div className="cs-loop-memory-bar" style={{ width: "72%" }} />
        </div>
        <div className="cs-loop-label cs-loop-label-reason">REASON</div>
        <div className="cs-loop-label cs-loop-label-observe">OBSERVE</div>
        <div className="cs-loop-label cs-loop-label-act">ACT</div>
      </div>
    </div>
  );
}

function Instrument({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="cs-instrument">
      <svg viewBox="0 0 100 58" fill="none" stroke="oklch(0.88 0.02 60)" strokeWidth={1.6}>
        {children}
      </svg>
      <div className="cs-instrument-label">{label}</div>
    </div>
  );
}
