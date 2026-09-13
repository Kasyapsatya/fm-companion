/**
 * Fully-written chapter bodies for the companion area.
 *
 * Only chapters that have been transcribed so far appear as keys
 * here (currently: Part III, "annuities" -- the first fully-worked
 * example chapter, per the user's confirmed rollout plan: build the
 * navigation shell for all 21 chapters, but only fully populate one
 * before doing the rest). Every formula, number, code block, tool
 * contract, agent example, takeaway and exercise below is transcribed
 * verbatim (or near-verbatim, reformatted only for HTML) from
 * `Applications_of_Agentic_AI_in_Financial_Mathematics.md`, Chapter
 * 10 -- nothing here is invented. A chapter with no entry in this map
 * falls back to the generic placeholder in the chapter page route.
 */

import type { ReactNode } from "react";

export const CHAPTER_BODIES: Record<string, () => ReactNode> = {
  "III/annuities": AnnuitiesBody,
};

export function getChapterBody(roman: string, slug: string): ReactNode | undefined {
  const key = `${roman}/${slug}`;
  const Body = CHAPTER_BODIES[key];
  return Body ? Body() : undefined;
}

function AnnuitiesBody() {
  return (
    <div className="chapter-body">
      <h2>Concept</h2>
      <p>
        Chapter 09 ended with a Technical Note observing that every Time Value of Money calculation
        involving a single lump sum has a closed-form solution, because a single cash flow involves only
        one power of (1+i). That stops being true the moment a calculation involves a <em>sum</em> of
        payments — which is what an annuity is. Annuities are the largest topic in introductory Financial
        Mathematics, and this chapter is correspondingly the most substantial in Part III.
      </p>
      <p>An annuity is a series of periodic payments.</p>

      <h2>Mathematical Foundation</h2>

      <h3>Level Annuity-Immediate</h3>
      <p>For a level annuity-immediate paying 1 at the end of each period for n periods, at effective interest rate i per period:</p>
      <div className="formula">{`a₍n⌐ = Σ v^k (k = 1..n) = (1 − v^n) / i

Accumulated value:  s₍n⌐ = (1+i)^n · a₍n⌐ = ((1+i)^n − 1) / i`}</div>
      <p>For a payment of P per period rather than 1, both present and accumulated values scale linearly: P·a₍n⌐ and P·s₍n⌐.</p>

      <h3>Level Annuity-Due</h3>
      <div className="formula">{`ä₍n⌐ = (1+i) · a₍n⌐ = (1 − v^n) / d

s̈₍n⌐ = (1+i) · s₍n⌐ = ((1+i)^n − 1) / d`}</div>

      <h3>Level Perpetuities</h3>
      <div className="formula">{`a₍∞⌐ = 1 / i          ä₍∞⌐ = 1 / d`}</div>

      <h3>m-thly and Continuous</h3>
      <div className="formula">{`a₍n⌐^(m) = (1 − v^n) / i^(m)

ā₍n⌐ = (1 − v^n) / δ`}</div>

      <h3>Arithmetic (Increasing / Decreasing) Annuities</h3>
      <div className="formula">{`i · (Ia)₍n⌐ = (1 + v + v² + … + v^(n−1)) − n·v^n = ä₍n⌐ − n·v^n

(Ia)₍n⌐ = (ä₍n⌐ − n·v^n) / i

(Da)₍n⌐ = (n − a₍n⌐) / i

General:  PV = (P − Q)·a₍n⌐ + Q·(Ia)₍n⌐

Increasing perpetuity:  (Ia)₍∞⌐ = 1 / (i·d)`}</div>

      <h3>Geometric Annuities</h3>
      <div className="formula">{`PV = Σ (1+g)^(j−1) · v^j  (j = 1..n) = v · Σ r^m (m = 0..n−1) = v · (1 − r^n) / (1 − r)

PV = (1 − ((1+g)/(1+i))^n) / (i − g),   g ≠ i
      (special case PV = n·v when g = i)

Geometric perpetuity (g < i):  PV = 1 / (i − g)`}</div>

      <h3>Solving for an Unknown Rate — Newton–Raphson</h3>
      <div className="formula">{`g(i)  = PMT · a₍n⌐ − PV = PMT · (1 − (1+i)^−n) / i − PV = 0

i_(k+1) = i_k − g(i_k) / g'(i_k)

d/di a₍n⌐ = (n·v^(n+1)·i − (1 − v^n)) / i² = (n·v^(n+1) − a₍n⌐) / i

g'(i) = PMT · (n·v^(n+1) − a₍n⌐) / i`}</div>

      <h2>Worked Examples</h2>

      <h3>Example 1 — level annuities and a perpetuity</h3>
      <p>An investor considers a level annuity of $500 per year for 10 years at an effective annual rate of 6%.</p>
      <div className="formula">{`(a) a₍10⌐ = (1 − 1.06⁻¹⁰) / 0.06 ≈ 7.360087
    PV = 500 × 7.360087 ≈ $3,680.04

(b) ä₍10⌐ = 1.06 × a₍10⌐ ≈ 7.801692
    PV = 500 × 7.801692 ≈ $3,900.85

(c) Perpetuity: PV = 500 / 0.06 ≈ $8,333.33`}</div>

      <h3>Example 2 — non-level annuities</h3>
      <p>
        (a) At 5%, an arithmetic annuity-immediate paying $100, $200, …, $600 at the end of years 1–6:
      </p>
      <div className="formula">{`a₍6⌐ ≈ 5.075692     ä₍6⌐ ≈ 5.329477

(Ia)₍6⌐ = (ä₍6⌐ − 6 × 1.05⁻⁶) / 0.05 ≈ 17.043686

With P = Q = $100 (pure increasing case):
PV = 100 × 17.043686 ≈ $1,704.37`}</div>
      <p>(b) At 7%, a geometric annuity-immediate, first payment $1,000, growing 3%/year, over 10 years:</p>
      <div className="formula">{`r = 1.03 / 1.07 ≈ 0.962617

PV = 1,000 × (1 − r¹⁰) / (0.07 − 0.03) ≈ $7,920.53`}</div>

      <h3>Example 3 — solving for the interest rate</h3>
      <p>A payment stream of $1,000 per year for 10 years has a present value of $7,500. Find the effective annual interest rate.</p>
      <table>
        <thead>
          <tr>
            <th>k</th>
            <th>i_k</th>
            <th>g(i_k)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>0</td><td>0.080000</td><td>−$789.92</td></tr>
          <tr><td>1</td><td>0.053900</td><td>$77.54</td></tr>
          <tr><td>2</td><td>0.056028</td><td>$0.60</td></tr>
          <tr><td>3</td><td>0.056045</td><td>≈ 0</td></tr>
        </tbody>
      </table>
      <p>The iteration converges to i ≈ 5.6045% in three steps. The Python implementation below (<code>solve_annuity_rate</code>) reproduces this.</p>

      <h2>Python Implementation</h2>
      <p>
        Every tool below follows the same Input / Processing / Output / Validation contract introduced in
        Chapter 05, and is registered on an Agno agent exactly as written — nothing here is simplified for
        the page.
      </p>

      <h3>annuity_immediate_pv</h3>
      <pre className="code-block"><code>{`from agno.exceptions import RetryAgentRun


def annuity_immediate_pv(payment: float, rate_per_period: float, n: int) -> float:
    """
    Compute the present value of a level annuity-immediate.

    Args:
        payment (float): The level payment amount per period. Must be
            non-negative.
        rate_per_period (float): The effective interest rate per
            payment period, as a decimal. Must be greater than -1.
        n (int): The number of payment periods. Must be positive.

    Returns:
        float: The present value of the annuity.
    """
    if payment < 0:
        raise RetryAgentRun(
            "payment must be non-negative. Re-read the request and "
            "call annuity_immediate_pv again with a corrected value."
        )
    if n <= 0:
        raise RetryAgentRun(
            "n must be a positive number of periods. Re-read the "
            "request and call annuity_immediate_pv again with a "
            "corrected value for n."
        )
    if rate_per_period <= -1:
        raise RetryAgentRun(
            "rate_per_period must be greater than -100%. Re-read the "
            "request and call annuity_immediate_pv again with a "
            "corrected rate_per_period."
        )
    if rate_per_period == 0:
        return payment * n
    v = 1 / (1 + rate_per_period)
    a_n = (1 - v ** n) / rate_per_period
    return payment * a_n`}</code></pre>

      <div className="takeaways">
        <h2>Tool Contract — annuity_immediate_pv</h2>
        <p style={{ marginBottom: 0 }}>
          <strong>Input</strong> — payment (float, ≥ 0), rate_per_period (float, &gt; −1), n (int, &gt; 0).
          <br />
          <strong>Processing</strong> — computes P·a₍n⌐ = P·(1 − v^n)/i, returning P·n when the rate is
          zero.
          <br />
          <strong>Output</strong> — a float: the present value one period before the first payment, in the
          same units as payment.
        </p>
      </div>

      <h3>annuity_due_pv</h3>
      <pre className="code-block"><code>{`def annuity_due_pv(payment: float, rate_per_period: float, n: int) -> float:
    """
    Compute the present value of a level annuity-due, by composing
    the annuity-immediate calculation.

    Args:
        payment (float): The level payment amount per period. Must be
            non-negative.
        rate_per_period (float): The effective interest rate per
            payment period, as a decimal. Must be greater than -1.
        n (int): The number of payment periods. Must be positive.

    Returns:
        float: The present value of the annuity-due.
    """
    return (1 + rate_per_period) * annuity_immediate_pv(payment, rate_per_period, n)`}</code></pre>
      <p>
        <strong>Key idea:</strong> <code>annuity_due_pv</code> performs no validation of its own and
        contains no summation logic. It calls <code>annuity_immediate_pv</code> and scales the result,
        mirroring the mathematical relationship above directly in code. Composed tools carry the
        validation of the tools they call automatically; there is no separate validation path to keep in
        sync. This pattern recurs throughout Part III.
      </p>

      <h3>perpetuity_immediate_pv</h3>
      <pre className="code-block"><code>{`def perpetuity_immediate_pv(payment: float, rate_per_period: float) -> float:
    """
    Compute the present value of a level perpetuity-immediate.

    Args:
        payment (float): The level payment amount per period. Must be
            non-negative.
        rate_per_period (float): The effective interest rate per
            payment period, as a decimal. Must be strictly positive.

    Returns:
        float: The present value of the perpetuity.
    """
    if payment < 0:
        raise RetryAgentRun(
            "payment must be non-negative. Re-check the request."
        )
    if rate_per_period <= 0:
        raise RetryAgentRun(
            "rate_per_period must be strictly positive for a perpetuity "
            "to have a finite present value. Re-check the request."
        )
    return payment / rate_per_period`}</code></pre>

      <h3>increasing_annuity_immediate_pv</h3>
      <pre className="code-block"><code>{`def increasing_annuity_immediate_pv(
    first_payment: float, increment: float, rate_per_period: float, n: int
) -> float:
    """
    Compute the present value of an arithmetic annuity-immediate,
    with payment k equal to first_payment + (k-1) * increment for
    k = 1, ..., n. A positive increment gives an increasing annuity;
    a negative increment gives a decreasing annuity.

    Args:
        first_payment (float): The payment at the end of period 1.
        increment (float): The constant change in payment each
            subsequent period. Positive for increasing, negative for
            decreasing.
        rate_per_period (float): The effective interest rate per
            payment period, as a decimal. Must be greater than -1.
        n (int): The number of payment periods. Must be positive.

    Returns:
        float: The present value of the arithmetic annuity.
    """
    if n <= 0:
        raise RetryAgentRun(
            "n must be a positive number of periods. Re-check the "
            "request."
        )
    if rate_per_period <= -1:
        raise RetryAgentRun(
            "rate_per_period must be greater than -100%. Re-check the "
            "request."
        )
    if rate_per_period == 0:
        return sum(first_payment + k * increment for k in range(n))
    v = 1 / (1 + rate_per_period)
    a_n = (1 - v ** n) / rate_per_period
    add_n = a_n * (1 + rate_per_period)
    increasing_factor = (add_n - n * v ** n) / rate_per_period
    return (first_payment - increment) * a_n + increment * increasing_factor`}</code></pre>

      <h3>geometric_annuity_immediate_pv</h3>
      <pre className="code-block"><code>{`def geometric_annuity_immediate_pv(
    first_payment: float, growth_rate: float, rate_per_period: float, n: int
) -> float:
    """
    Compute the present value of a geometric annuity-immediate, with
    first payment first_payment growing by a factor of
    (1 + growth_rate) each subsequent period, for n periods.

    Args:
        first_payment (float): The payment at the end of period 1.
            Must be non-negative.
        growth_rate (float): The per-period growth rate of the
            payments, as a decimal. Must be greater than -1.
        rate_per_period (float): The effective interest rate per
            payment period, as a decimal. Must be greater than -1.
        n (int): The number of payment periods. Must be positive.

    Returns:
        float: The present value of the geometric annuity.
    """
    if first_payment < 0:
        raise RetryAgentRun("first_payment must be non-negative. Re-check the request.")
    if n <= 0:
        raise RetryAgentRun("n must be a positive number of periods. Re-check the request.")
    if rate_per_period <= -1 or growth_rate <= -1:
        raise RetryAgentRun(
            "Both rate_per_period and growth_rate must be greater than "
            "-100%. Re-check the request."
        )
    if abs(rate_per_period - growth_rate) < 1e-12:
        v = 1 / (1 + rate_per_period)
        return first_payment * n * v
    r = (1 + growth_rate) / (1 + rate_per_period)
    return first_payment * (1 - r ** n) / (rate_per_period - growth_rate)`}</code></pre>

      <h3>solve_annuity_rate</h3>
      <pre className="code-block"><code>{`from scipy.optimize import newton


def solve_annuity_rate(
    payment: float, present_value: float, n: int, initial_guess: float = 0.05
) -> float:
    """
    Solve for the effective interest rate per period implied by a
    level annuity-immediate's payment, present value, and term, using
    Newton-Raphson.

    Args:
        payment (float): The level payment amount per period. Must be
            positive.
        present_value (float): The annuity's present value. Must be
            positive and less than payment * n.
        n (int): The number of payment periods. Must be positive.
        initial_guess (float): The starting point for the iteration.
            Defaults to 0.05 (5%).

    Returns:
        float: The implied effective interest rate per period.
    """
    if payment <= 0 or present_value <= 0:
        raise RetryAgentRun(
            "payment and present_value must both be positive. "
            "Re-check the request."
        )
    if n <= 0:
        raise RetryAgentRun(
            "n must be a positive number of periods. Re-check the "
            "request."
        )
    if present_value >= payment * n:
        raise RetryAgentRun(
            "present_value must be less than payment * n; no positive "
            "interest rate produces a present value this large for "
            "this payment and term. Re-check the request."
        )

    def g(i: float) -> float:
        return annuity_immediate_pv(payment, i, n) - present_value

    def g_prime(i: float) -> float:
        v = 1 / (1 + i)
        a_n = (1 - v ** n) / i
        return payment * (n * v ** (n + 1) - a_n) / i

    try:
        return newton(g, initial_guess, fprime=g_prime)
    except RuntimeError:
        raise RetryAgentRun(
            "The Newton-Raphson iteration did not converge from the "
            "given starting point. Try again with a different "
            "initial_guess, or re-check the inputs for consistency."
        )`}</code></pre>

      <h2>Agent Implementation</h2>
      <p>All six tools register on a single Agno agent:</p>
      <pre className="code-block"><code>{`from agno.agent import Agent
from agno.models.google import Gemini

annuity_agent = Agent(
    name="Annuity Agent",
    role="Answers annuity questions: present value of level, "
         "arithmetic, and geometric annuities and perpetuities, and "
         "solves for an unknown interest rate given payment, term, "
         "and present value.",
    model=Gemini(id="gemini-3.5-flash", temperature=0.0),
    tools=[
        annuity_immediate_pv,
        annuity_due_pv,
        perpetuity_immediate_pv,
        increasing_annuity_immediate_pv,
        geometric_annuity_immediate_pv,
        solve_annuity_rate,
    ],
    instructions=[
        "Always use one of the available tools to perform any "
        "numerical calculation. Never state a computed numeric "
        "result unless it came directly from a tool call.",
        "If it is unclear whether payments begin immediately "
        "(annuity-due) or at the end of the first period "
        "(annuity-immediate), ask a brief clarifying question rather "
        "than guessing.",
        "If a request gives a payment, term, and present value and "
        "asks for the interest rate, use solve_annuity_rate.",
    ],
    markdown=True,
)

annuity_agent.print_response(
    "A payment stream of $1,000 a year for 10 years, paid at the end "
    "of each year, has a present value of $7,500. What interest "
    "rate does that imply?"
)`}</code></pre>
      <p>
        Given this request, the agent should recognise, from the third instruction, that
        <code> solve_annuity_rate</code> is the appropriate tool, call it with{" "}
        <code>payment=1000, present_value=7500, n=10</code>, and report the result — reproducing Example 3
        above, with the Newton–Raphson iteration hidden from the conversation.
      </p>

      <h2>Where This Can Fail</h2>
      <p>
        <strong>Annuity-immediate versus annuity-due ambiguity.</strong> This is the chapter&apos;s most
        realistic failure mode, paralleling Chapter 09&apos;s nominal-versus-effective concern. The second
        agent instruction above asks the model to seek clarification rather than guess; whether it does so
        reliably is a question for Chapter 19&apos;s evaluation practices, not something the instruction&apos;s
        presence settles on its own.
      </p>
      <p>
        <strong>Newton–Raphson non-convergence.</strong> <code>solve_annuity_rate</code>&apos;s validation
        rejects the one case with a provably impossible request (present_value ≥ payment × n), but
        plausible-looking inputs can still cause the iteration to fail from a poorly chosen initial_guess,
        particularly for large n or a present_value close to its boundary. The <code>RetryAgentRun</code>{" "}
        raised in that case gives the model a chance to retry with a different starting point.
      </p>
      <p>
        <strong>Payments implied to go negative.</strong> <code>increasing_annuity_immediate_pv</code> with
        a large negative increment will happily value a stream whose later &quot;payments&quot; are
        negative. The formula is still correct for that stream, but it is unlikely to be what a user meant,
        and nothing in the tool detects it.
      </p>
      <p>
        <strong>Tool-set growth.</strong> This agent&apos;s six tools are a small, well-differentiated set.
        Adding Chapter 11&apos;s loan tools to the same agent is the point at which Chapter 08&apos;s
        specialisation pattern starts to become worth considering.
      </p>

      <div className="takeaways">
        <h2>Key Takeaways</h2>
        <ul>
          <li>
            Annuities generalise Chapter 09&apos;s single lump sum to a stream of payments, distinguished by
            timing (immediate versus due), duration (finite versus perpetuity), frequency (annual, m-thly,
            or continuous), and payment pattern (level, arithmetic, or geometric); every formula in this
            chapter reduces to the geometric series sum at its core.
          </li>
          <li>
            Solving for an unknown interest rate given payment, term, and present value has no closed-form
            solution once payments form a sum of more than one term; this is where Newton–Raphson becomes
            necessary.
          </li>
          <li>
            Composing tools (<code>annuity_due_pv</code> calling <code>annuity_immediate_pv</code>) mirrors
            mathematical relationships directly in code and avoids duplicating validation logic.
          </li>
          <li>
            Ambiguity between annuity-immediate and annuity-due timing is a realistic, recurring failure
            mode for a natural-language agent, analogous to the nominal-versus-effective ambiguity of
            Chapter 09.
          </li>
        </ul>
      </div>

      <h2>Exercises</h2>
      <ol>
        <li>
          <strong>Conceptual.</strong> Explain why annuity-due present value can be obtained by multiplying
          annuity-immediate present value by (1+i), using the timing of the payments rather than
          re-deriving the summation.
        </li>
        <li>
          <strong>Mathematical.</strong> A perpetuity-due pays $200 per year, first payment today, at an
          effective annual rate of 4%. Find its present value, and verify your answer is consistent with
          ä₍∞⌐ = 1/d.
        </li>
        <li>
          <strong>Mathematical.</strong> Using the general arithmetic annuity formula above, find the
          present value of a decreasing annuity-immediate paying $500, $400, $300, $200, $100 at the end of
          years 1 through 5, at an effective annual rate of 6%.
        </li>
        <li>
          <strong>Implementation.</strong> <code>solve_annuity_rate</code> solves for the interest rate
          given payment, present value, and term. Write the full tool contract for a new function{" "}
          <code>solve_annuity_term</code> that instead solves for the number of periods n given payment,
          present value, and interest rate — and explain whether this new function needs Newton–Raphson, or
          has a closed-form solution (consider taking a logarithm of the rearranged annuity formula).
        </li>
        <li>
          <strong>Tool and agent design.</strong> Combine this chapter&apos;s six annuity tools with Chapter
          09&apos;s five Time Value of Money tools into a single agent, and test whether tool selection
          remains reliable. If you observe selection errors, redesign the system as a two-specialist team
          (Chapter 08) instead, and compare.
        </li>
        <li>
          <strong>Evaluation.</strong> Construct a request that is genuinely ambiguous between
          annuity-immediate and annuity-due. Run it through the agent above several times at temperature
          zero and note whether it asks a clarifying question consistently, occasionally, or never.
        </li>
      </ol>

      <details style={{ marginTop: 8, marginBottom: 24 }}>
        <summary style={{ cursor: "pointer", fontSize: 13.5, color: "var(--slate)" }}>
          Answers to Exercises 2–4
        </summary>
        <div style={{ marginTop: 14 }}>
          <p>
            <strong>2.</strong> d = i/(1+i) = 0.04/1.04 ≈ 0.038462, so ä₍∞⌐ = 1/d = 26 and PV = 200 × 26 =
            $5,200. Equivalently (1+i) × 200/i = 1.04 × 5,000 = 5,200.
          </p>
          <p>
            <strong>3.</strong> With P = 500, Q = −100, n = 5, i = 0.06: a₍5⌐ ≈ 4.212364, (Ia)₍5⌐ ≈ 12.147,
            so PV = (500 + 100)(4.212364) − 100(12.147) ≈ $1,312.73. Check via (Da)₍5⌐ = (5 − a₍5⌐)/i ≈
            13.12727: 100 × 13.12727 = 1,312.73. <code>increasing_annuity_immediate_pv(500, -100, 0.06, 5)</code>{" "}
            returns 1312.73.
          </p>
          <p>
            <strong>4.</strong> Rearranging PV = PMT · (1 − v^n)/i gives v^n = 1 − PV·i/PMT, so n =
            −ln(1 − PV·i/PMT) / ln(1+i): a closed form, no Newton–Raphson needed. Contract — Input: payment
            (positive), present_value (positive, less than payment/rate_per_period so the logarithm&apos;s
            argument is positive), rate_per_period (positive). Output: n as a float, which will generally
            not be an integer. Check: payment=1000, present_value=7500, rate_per_period=0.056045 returns
            10.0.
          </p>
        </div>
      </details>
    </div>
  );
}
