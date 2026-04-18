import Head from 'next/head';
import BlogrollEntry from '@components/blogroll-entry';
import Text from '@components/text';

const Blogroll = () => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - Blogroll</title>
    </Head>

    <Text.Headline testId="blogroll-heading" as="h1">
      Blogroll
    </Text.Headline>

    <Text.Paragraph>
      A collection of blog posts I enjoyed reading and found worth sharing.
    </Text.Paragraph>

    <section className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-2">
      <BlogrollEntry
        title="React Server Components Your Way"
        href="https://tanstack.com/blog/react-server-components"
        author="Tanner Linsley"
        teaser="RSCs became a paradigm you orbit around, not a primitive you reach for. TanStack reframes them as just streams of data the client fetches, caches, and composes. Powerful primitives lose their leverage the moment a framework makes them mandatory."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="Uses for Nested Promises"
        href="https://blog.jcoglan.com/2026/03/23/uses-for-nested-promises/"
        author="James Coglan"
        teaser="Promise.then() implicitly flattens nested promises, a choice that lost functional programmers the Promises/A+ debate but won on convenience. Real concurrency control code reveals rare but legitimate uses for keeping the nesting intact."
        tags={['engineering', 'frontend']}
      />
      <BlogrollEntry
        title="Dropping Sprints: A Year with Shape Up"
        href="https://newsletter.manager.dev/p/dropping-sprints-a-year-with-shape-up"
        author="Anton Zaides"
        teaser="One year after ditching Scrum for Shape Up, the team moved from maintenance mode to high output with happier engineers. Fixed time with variable scope beat the sprint treadmill."
        tags={['leadership', 'engineering']}
      />
      <BlogrollEntry
        title="Under the Hood of MDN's New Frontend"
        href="https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/"
        author="Leo McArdle"
        teaser="MDN rebuilt its frontend and unpacks the why. Lit-powered web components replace a tangle of four git repos, cutting friction for authors of interactive examples."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="The Vertical Codebase"
        href="https://tkdodo.eu/blog/the-vertical-codebase"
        author="Dominik Dorfmeister"
        teaser="Organizing code by technical layer scales poorly once features cross boundaries. Slicing vertically by feature keeps related code colocated, reduces cross-cutting churn, and makes ownership obvious."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="Signals: The Push-Pull Based Algorithm"
        href="https://willybrauner.com/journal/signal-the-push-pull-based-algorithm"
        author="Willy Brauner"
        teaser="Signals power Solid, Vue, and modern reactivity, yet few devs can explain their internals. Pushes notify downward, pulls re-evaluate upward, and together they keep reactive graphs efficient."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="How Does React Fiber Render Your UI"
        href="https://inside-react.vercel.app/blog/how-does-react-fiber-render-your-ui"
        author="Sankalpa Acharya"
        teaser="Recursive rendering blocks the browser. Fiber slices work into ~5ms chunks so the main thread stays responsive. A walk through the linked-list tree of fiber nodes that powers interruptible reconciliation."
        tags={['frontend']}
      />
      <BlogrollEntry
        title="9 Stupid Power Moves Managers Make"
        href="https://yanivpreiss.com/2026/03/29/9-stupid-power-moves-managers-make-and-the-damage-they-leave-behind/"
        author="Yaniv Preiss"
        teaser="Power moves spring from insecurity, not authority, and they quietly corrode trust. Nine common ones and the damage each leaves behind."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="The Economics of Software Teams"
        href="https://www.viktorcessan.com/the-economics-of-software-teams/"
        author="Viktor Cessan"
        teaser="A team of eight engineers burns roughly 4,000 euros per working day, yet most organizations have no visibility into that number or what it takes to break even. Two decades of structural blindness now collides with the arrival of LLMs."
        tags={['leadership', 'engineering']}
      />
      <BlogrollEntry
        title="AI Cybersecurity After Mythos: The Jagged Frontier"
        href="https://aisle.com/blog/ai-cybersecurity-after-mythos-the-jagged-frontier"
        author="Stanislav Fort"
        teaser="Cybersecurity capability in LLMs is jagged. It does not scale smoothly with size, generation, or price. Small open-weights models matched a flagship on the same FreeBSD exploit at a fraction of the cost."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="The Center Has a Bias"
        href="https://lucumr.pocoo.org/2026/4/11/the-center-has-a-bias/"
        author="Armin Ronacher"
        teaser="The middle ground on AI isn't neutral. It's occupied by people who actually used the tools long enough to judge them. Non-use is not the same as balance."
        tags={['ai', 'leadership']}
      />
      <BlogrollEntry
        title="The Uphill Climb of Making Diff Lines Performant"
        href="https://github.blog/engineering/architecture-optimization/the-uphill-climb-of-making-diff-lines-performant/"
        author="GitHub Engineering"
        teaser="GitHub rebuilt diff rendering and found the win was not smarter code but less of it. The fastest path to performance often runs through simplicity."
        tags={['engineering', 'frontend']}
      />
      <BlogrollEntry
        title="Evaluating GenAI Features in Enterprise Software Requires a Human Touch"
        href="https://medium.com/@mbarrena/evaluating-genai-features-in-enterprise-software-requires-a-human-touch-9ab4a7f0fabf"
        author="Mario Barrena"
        teaser="Automated benchmarks miss what actually matters in enterprise GenAI. Real quality signals come from humans in the loop, not leaderboards."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="What I Learned From Nearly 1,000 Interviews at Amazon"
        href="https://alifeengineered.substack.com/p/what-i-learned-from-nearly-1000-interviews"
        author="A Life Engineered"
        teaser="A decade as an Amazon Bar Raiser, distilled into what actually separates strong candidates from the rest. Signal beats polish, and most interviewers look for the wrong things."
        tags={['leadership', 'career']}
      />
      <BlogrollEntry
        title="Finding Comfort in the Uncertainty"
        href="https://annievella.com/posts/finding-comfort-in-the-uncertainty/"
        author="Annie Vella"
        teaser="Forty of the sharpest minds in software gathered to map the AI-shaped future. The biggest takeaway. Nobody has it figured out, and that shared uncertainty is oddly the most useful answer."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="Good Taste the Only Real Moat Left"
        href="https://rajnandan.com/posts/taste-in-the-age-of-ai-and-llms/"
        author="Raj Nandan"
        teaser="AI commoditizes competence, but judgment becomes scarce. The real edge isn't in output quality but in pairing taste with context and the conviction to build something meaningful."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="AI Is Really Weird"
        href="https://www.wheresyoured.at/ai-is-really-weird/"
        author="Ed Zitron"
        teaser="AI systems behave in ways that defy intuition and resist simple categorization. Understanding their weirdness is essential for anyone building with or around them."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Say the Thing You Want"
        href="https://terriblesoftware.org/2026/04/01/say-the-thing-you-want/"
        author="Terrible Software"
        teaser="Your silence at work isn't protecting you. It's costing you. Ask for what you actually need."
        tags={['leadership', 'career']}
      />
      <BlogrollEntry
        title="The Middle Loop"
        href="http://annievella.com/posts/the-middle-loop/"
        author="Annie Vella"
        teaser="Time investment shapes thought patterns, which compound into skill. Where you focus your hours is where your expertise emerges."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="Your Engineers Aren't Lazy, Your Codebase Is Punishing Them"
        href="https://piechowski.io/post/codebase-drag-audit/"
        author="Piechowski"
        teaser="Technical debt isn't an engineering morale problem. It's a code problem. A quick audit reveals whether you're fighting the system or the people."
        tags={['leadership', 'engineering']}
      />
      <BlogrollEntry
        title="Reflection is a Crucial Leadership Skill"
        href="https://blog.kevingoldsmith.com/2026/04/01/reflection-is-a-crucial-leadership-skill/"
        author="Kevin Goldsmith"
        teaser="Leaders who pause to examine what worked and what didn't gain insight that keeps them from repeating mistakes and compounds their effectiveness."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Harness Engineering for Coding Agent Users"
        href="https://martinfowler.com/articles/harness-engineering.html"
        author="Martin Fowler"
        teaser="Building reliable systems around AI agents requires intentional design patterns. Harness engineering treats the agent as a fallible component in a larger architecture."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="How to be a Web Developer"
        href="https://stuffeverybodyknows.com/"
        author="Laurie Voss"
        teaser="A roadmap for the career arc beyond your first years in web development, from someone who's lived it."
        tags={['career']}
      />
      <BlogrollEntry
        title="Components of A Coding Agent"
        href="https://magazine.sebastianraschka.com/p/components-of-a-coding-agent"
        author="Sebastian Raschka"
        teaser="Coding agents work when they combine three things well: tools, memory, and repository context. Understanding these components explains why some agents fail and others don't."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Reinventing the Pull Request"
        href="https://lubeno.dev/blog/reinventing-the-pull-request"
        author="Lubeno"
        teaser="Code review catches bugs, but great review reduces comprehension debt. PRs should help teams understand the codebase faster, not just validate changes."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="The Alignment Tax: What a Real CTO Relationship Looks Like vs. a Fake One"
        href="https://insideproductorg.substack.com/p/the-alignment-tax-what-a-real-cto"
        author="Inside Product"
        teaser="When a CTO is genuinely aligned with the business, the entire organization temperature shifts. Misalignment creates hidden friction that compounds across teams."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Better, Faster, and (Even) More"
        href="https://randsinrepose.com/archives/better-faster-and-even-more/"
        author="Rands"
        teaser="A relentless focus on velocity led to building more interesting, random, and useless scripts and tools than ever before. Sometimes the best learning comes from building things that don't need to exist."
        tags={['ai']}
      />
      <BlogrollEntry
        title="use(): The Hook That Breaks the Rules (On Purpose)"
        href="https://saschb2b.com/en/blog/use-hook-react"
        author="Sasha Baranov"
        teaser="React's use() hook reads promises and context at render time without the complexity of useEffect. The missing piece that finally makes async patterns feel native to component rendering."
        tags={['frontend']}
      />
      <BlogrollEntry
        title="Claude Code - The Practical Guide"
        href="https://pro.academind.com/p/claude-code-the-practical-guide"
        author="Academind"
        teaser="A hands-on guide to making Claude Code part of your actual development workflow."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Anatomy of the .claude/ Folder"
        href="https://blog.dailydoseofds.com/p/anatomy-of-the-claude-folder"
        author="Daily Dose of DS"
        teaser="The .claude folder is where you configure your entire Claude Code experience. How CLAUDE.md, custom commands, skills, agents, and permissions work together."
        tags={['ai']}
      />
      <BlogrollEntry
        title="How To Handle Overly Confident And Combative Colleagues"
        href="https://news.theuncommonexecutive.com/p/how-to-handle-overly-confident-and"
        author="The Uncommon Executive"
        teaser="When you need something from a defensive or hostile coworker, transaction-focused approaches backfire. The strategy requires reframing the relationship before the ask."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="When a Manager Should Step In"
        href="https://www.dein.fr/posts/2026-03-17-when-a-manager-should-step-in"
        author="Charles-Axel Dein"
        teaser="Knowing when to intervene as a manager is a skill distinct from knowing how. The difference between micromanagement and appropriate guidance lies in recognizing which moments actually require your involvement."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Thoughts on slowing the fuck down"
        href="https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/"
        author="Mario Zechner"
        teaser="A reflection on the cost of constant acceleration and what happens when you deliberately choose to slow down."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="Becoming an AI-first software-intensive company"
        href="https://janbosch.com/blog/index.php/2026/02/03/becoming-an-ai-first-software-intensive-company/"
        author="Jan Bosch"
        teaser="Transforming into an AI-first company isn't about tools. It's about fundamentally rethinking how software gets built and how engineering teams organize around that change."
        tags={['ai', 'leadership']}
      />
      <BlogrollEntry
        title="Relocating Rigor - The Phoenix Architecture"
        href="https://aicoding.leaflet.pub/3mbrvhyye4k2e"
        author="AI Coding"
        teaser="True rigor in modern systems often looks like apparent recklessness. The Phoenix Architecture challenges conventional wisdom about structure and control."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="What Really Happens in a Board Meeting"
        href="https://blog.kevingoldsmith.com/2026/02/18/what-really-happens-in-a-board-meeting/"
        author="Kevin Goldsmith"
        teaser="Behind the polished presentations and formal agendas lies a messier reality about how decisions actually get made in board meetings."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Seven Years to TypeScript: Migrating 11,000 Files at Patreon"
        href="https://www.patreon.com/posts/seven-years-to-152144830"
        author="Patreon Engineering"
        teaser="A decade-long journey of migrating an entire codebase to TypeScript reveals lessons about gradual modernization at scale."
        tags={['engineering', 'frontend']}
      />
      <BlogrollEntry
        title="The Reason Most People Are Terrible Communicators (And How to Fix It)"
        href="https://alifeengineered.substack.com/p/the-reason-most-people-are-terrible"
        author="A Life Engineered"
        teaser="Being right doesn't matter if nobody understands what you're saying. Learn the core gap between clarity and correctness."
        tags={['leadership', 'career']}
      />
      <BlogrollEntry
        title="How The New York Times is scaling Unit Test Coverage using AI Tools"
        href="https://open.nytimes.com/how-the-new-york-times-is-scaling-unit-test-coverage-using-ai-tools-fa796bf9b8d2"
        author="New York Times Engineering"
        teaser="AI tools are helping engineers write better tests at scale, tackling one of engineering's persistent blind spots."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="Management In The Age Of AI"
        href="https://staysaasy.com/management/2026/03/12/ai-management.html"
        author="Stay SaaSy"
        teaser="The role of managers is evolving with AI, not disappearing. What changes and what stays the same."
        tags={['ai', 'leadership']}
      />
      <BlogrollEntry
        title="AI should help us produce better code"
        href="https://simonwillison.net/guides/agentic-engineering-patterns/better-code/"
        author="Simon Willison"
        teaser="Agentic patterns aren't about replacing engineers. They're about building systems that elevate code quality and developer productivity."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="Thinking tools: How to identify assumptions by distorting time"
        href="https://www.jonesabi.com/blog/thinking-tools-how-to-identify-assumptions-by-distorting-time"
        author="Abi Jones"
        teaser="A practical technique for exposing hidden assumptions in your thinking by playing with timescales."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="MCP is dead. Long live the CLI"
        href="https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html"
        author="EJ Holmes"
        teaser="Why CLI-based patterns are winning over MCP for building AI agents and what it means for the tooling landscape."
        tags={['ai']}
      />
      <BlogrollEntry
        title="I Made MCP 94% Cheaper (And It Only Took One Command)"
        href="https://kanyilmaz.me/2026/02/23/cli-vs-mcp.html"
        author="Kan Yilmaz"
        teaser="A concrete cost comparison between CLI and MCP approaches reveals surprising economics for agent deployment."
        tags={['ai']}
      />
      <BlogrollEntry
        title="How we rebuilt Next.js with AI in one week"
        href="https://blog.cloudflare.com/vinext/"
        author="Cloudflare"
        teaser="One engineer rebuilt Next.js on Vite with AI assistance, achieving 4x faster builds, 57% smaller bundles, and Workers deployment in a week."
        tags={['ai', 'frontend']}
      />
      <BlogrollEntry
        title="Legitimate Power: Authority and Power are Not the Same Thing"
        href="https://www.leadingsapiens.com/legitimate-power/"
        author="Leading Sapiens"
        teaser="Why do we comply with directives we privately question? The crucial distinction between power through fear and authority through legitimacy."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Micro Frontends: When They Make Sense and When They Don't"
        href="https://lukasniessen.medium.com/micro-frontends-when-they-make-sense-and-when-they-dont-a1a06b726065"
        author="Lukas Niessen"
        teaser="Microservices unlocked backend autonomy, but applying the same pattern to frontends isn't always the solution. When micro frontends genuinely add value."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="On the Question of Debt"
        href="https://medium.com/mapai/on-the-question-of-debt-aca1125d4a62"
        author="MapAI"
        teaser="Beyond technical debt: a framework for understanding four types of system debt including technical, evolutionary, and cognitive dimensions."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Something Big Is Happening"
        href="https://shumer.dev/something-big-is-happening"
        author="Matt Shumer"
        teaser="A grounded take on what AI is actually changing for non-tech folks, cutting through the noise to explain real implications."
        tags={['ai']}
      />
      <BlogrollEntry
        title="MCP: What It Is and Why It Matters"
        href="https://addyo.substack.com/p/mcp-what-it-is-and-why-it-matters"
        author="Addy Osmani"
        teaser="The Model Context Protocol is creating a common language between AI and apps, enabling a new category of integrations and possibilities."
        tags={['ai']}
      />
      <BlogrollEntry
        title="LangGraph for complex workflows"
        href="https://surma.dev/things/langgraph/"
        author="Surma"
        teaser="LangGraph codifies complex workflow architectures as executable automations, giving structure to stateful AI reasoning."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Why Using an LLM to Redact PII and PHI is a Bad Idea"
        href="https://blog.philterd.ai/why-using-an-llm-to-identify-and-redact-pii-and-phi-is-a-bad-idea/"
        author="Philterd"
        teaser="Relying on LLMs for sensitive data redaction introduces hallucination risks where accuracy isn't optional. Deterministic approaches are essential."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Built With Borrowed Hands"
        href="https://cra.mr/built-with-borrowed-hands/"
        author="Craig Condon"
        teaser="What happens when you build production infrastructure using only AI agents writing code? A two-month experiment in agentic development constraints."
        tags={['ai']}
      />
      <BlogrollEntry
        title="MCP UI: Breaking the text wall with interactive components"
        href="https://shopify.engineering/mcp-ui-breaking-the-text-wall"
        author="Shopify Engineering"
        teaser="MCP UI extends the Model Context Protocol to let AI agents return interactive components instead of just text, making agent outputs more actionable."
        tags={['ai', 'frontend']}
      />
      <BlogrollEntry
        title="How to build an Agent, On-Device Edition"
        href="https://ryanseddon.com/ai/how-to-build-an-agent-on-device/"
        author="Ryan Seddon"
        teaser="Build fully functional agents using on-device models like Phi-4-mini in under 200 lines of code, bringing AI inference closer to users."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Agentic Coding Best Practices"
        href="https://benhouston3d.com/blog/agentic-coding-best-practices"
        author="Ben Houston"
        teaser="As AI coding agents evolve from tools to collaborators, our code organization and documentation must evolve with them. How to structure projects for agent-friendly codebases."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="What are AI Agents? Why do they matter?"
        href="https://addyo.substack.com/p/what-are-ai-agents-why-do-they-matter"
        author="Addy Osmani"
        teaser="Understand the evolution from simple automation to intelligent agents: their architecture, capabilities, and why they represent a fundamental shift in how we build software."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Agent Recipes"
        href="https://www.agentrecipes.com/"
        author="Agent Recipes"
        teaser="Skip the experimentation phase with ready-to-use agent patterns and copy-paste code snippets designed to improve your LLM applications immediately."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Building Effective AI Agents"
        href="https://www.anthropic.com/engineering/building-effective-agents"
        author="Anthropic"
        teaser="Anthropic's battle-tested principles for building reliable, production-ready AI agents that actually work at scale."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Agents 2.0: From Shallow Loops to Deep Agents"
        href="https://www.philschmid.de/agents-2.0-deep-agents"
        author="Philipp Schmid"
        teaser="Move beyond simple request-response loops to deep agents that maintain state, reason over extended periods, and handle genuinely complex multi-step workflows."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Agentic workers for commerce operations: a proof of concept"
        href="https://commercelayer.io/blog/agentic-workers-for-commerce-operations-poc"
        author="Commerce Layer"
        teaser="How agentic AI workers with Mastra.ai and MCP can automate e-commerce operations end-to-end, reducing manual overhead significantly."
        tags={['ai']}
      />
      <BlogrollEntry
        title="My AI Adoption Journey"
        href="https://mitchellh.com/writing/my-ai-adoption-journey"
        author="Mitchell Hashimoto"
        teaser="Real lessons from integrating AI tools into daily development work: what worked, what didn't, and how adoption patterns are changing how senior engineers operate."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="One list to rule them all"
        href="https://theengineeringmanager.substack.com/p/one-list-to-rule-them-all"
        author="The Engineering Manager"
        teaser="A deceptively simple framework for making hard decisions as an engineering leader by focusing on what matters most."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Navigating the Current Landscape: Growth Beyond the Ladder"
        href="https://victoravelar.dev/articles/2026/navigating-the-current-landscape-growth-beyond-the-ladder/"
        author="Victor Avelar"
        teaser="Career growth isn't always up. Discover the three key motivators that matter in a saturated job market and why your next strategic move might be staying put."
        tags={['career']}
      />
      <BlogrollEntry
        title="Accelerate Next.js in Kubernetes"
        href="https://blog.platformatic.dev/93-faster-nextjs-in-your-kubernetes"
        author="Platformatic"
        teaser="Performance gains matter in production. Practical optimizations to run Next.js faster in Kubernetes environments."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="AI is Killing B2B SaaS"
        href="https://nmn.gl/blog/ai-killing-b2b-saas"
        author="NMN"
        teaser="The SaaS model's greatest strength becomes a liability as AI commoditizes once-differentiated products. The race for profitability just got harder."
        tags={['ai']}
      />
      <BlogrollEntry
        title="The Deletion Test - The Phoenix Architecture"
        href="https://aicoding.leaflet.pub/3md5ftetaes2e"
        author="AI Coding"
        teaser="A resilience pattern that tests whether your system can survive the removal of its own components. Architecture thinking at its most practical."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="Things I've learned in my 10 years as an engineering manager"
        href="https://www.jampa.dev/p/lessons-learned-after-10-years-as"
        author="Jampa"
        teaser="A decade of management experience distilled into non-obvious advice that changes how you think about leading engineers."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Aligning Product and GTM with Customer Value Metrics"
        href="https://www.balderton.com/resources/aligning-product-and-gtm-with-customer-value-metrics/"
        author="Dan Teodosiu and Dave Kellogg"
        teaser="When product and go-to-market strategies drift, founders lose leverage. How to align both around metrics that actually predict customer success."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Conflict Between Neurotypes"
        href="https://blog.izs.me/2025/11/ogc-4-conflict/"
        author="Isaac Z. Schlueter"
        teaser="Neurodiversity isn't just about accommodation. It's about understanding how different thinking styles create friction in teams and how to navigate it."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="The Architect's Guide to Micro-Frontends"
        href="https://developersvoice.com/blog/frontend/micro-frontends-with-react-and-angular/"
        author="Developers Voice"
        teaser="Scale frontend architecture without scaling complexity. Module Federation enables independent teams to ship in parallel without coordination overhead."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="The Next Two Years of Software Engineering"
        href="https://addyosmani.com/blog/next-two-years/"
        author="Addy Osmani"
        teaser="Five critical questions are reshaping how we build software. Competing scenarios for each and what they mean for your choices today."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="One bottleneck at a time"
        href="https://theengineeringmanager.substack.com/p/one-bottleneck-at-a-time"
        author="The Engineering Manager"
        teaser="Manager instinct often says fix everything at once, but the easy way forward is paradoxically harder. Tackle bottlenecks sequentially to avoid chaos."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Building High-Performing Remote Engineering Teams"
        href="https://hansreinl.de/blog/remote-engineering-leadership"
        author="Hans Reinl"
        teaser="Explores the distinct challenges and opportunities of leading engineering teams across distributed locations, moving beyond one-size-fits-all remote work policies."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Useful engineering management artifacts"
        href="https://bjorg.bjornroche.com/management/engineering-management-artifacts/"
        author="Bjorn Roche"
        teaser="Document templates and structural tools that help scaling engineering organizations maintain clarity and alignment as teams grow."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Rise of the 'operator EM'"
        href="https://medium.com/one-to-n/rise-of-the-operator-em-f1b9010b876e"
        author="One to N"
        teaser="The playbook for engineering management has shifted in the post-ZIRP era, requiring managers to balance efficiency with the realities of constrained resources."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="21 Lessons from 14 Years at Google"
        href="https://addyo.substack.com/p/21-lessons-from-14-years-at-google"
        author="Addy Osmani"
        teaser="Distilled wisdom on code quality, career progression, and the interpersonal dimensions of engineering drawn from nearly a decade and a half at scale."
        tags={['career', 'engineering']}
      />
      <BlogrollEntry
        title="'Good engineering management' is a fad"
        href="https://lethain.com/good-eng-mgmt-is-a-fad/"
        author="Will Larson"
        teaser="Challenges the assumption that modern management practices are universally correct, arguing context and organizational needs matter more than dogma."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Introducing advanced tool use"
        href="https://www.anthropic.com/engineering/advanced-tool-use"
        author="Anthropic"
        teaser="Claude can now discover and dynamically execute tools in real-time, enabling AI agents to take actions directly in external systems without pre-integration."
        tags={['ai']}
      />
      <BlogrollEntry
        title="BFCM Readiness 2025"
        href="https://shopify.engineering/bfcm-readiness-2025"
        author="Shopify Engineering"
        teaser="Technical strategies and infrastructure patterns for handling peak traffic during Black Friday and Cyber Monday at scale."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Just Talk To It"
        href="https://steipete.me/posts/just-talk-to-it"
        author="Peter Steinberger"
        teaser="A grounded, practical approach to working with AI coding agents that cuts through hype and focuses on what actually works."
        tags={['ai']}
      />
      <BlogrollEntry
        title="How to Use Claude Code Subagents to Parallelize Development"
        href="https://zachwills.net/how-to-use-claude-code-subagents-to-parallelize-development/"
        author="Zach Wills"
        teaser="Lessons from building a metrics tool using subagents to split work in parallel, demonstrating concrete patterns for AI-accelerated development workflows."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Going direct"
        href="https://theengineeringmanager.substack.com/p/going-direct"
        author="The Engineering Manager"
        teaser="Effective organizations communicate fluidly across org chart boundaries rather than rigidly following reporting lines, accelerating decision-making."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Why LLMs Can't Really Build Software"
        href="https://zed.dev/blog/why-llms-cant-build-software"
        author="Zed"
        teaser="Writing code is only one part of effective software engineering. LLMs excel at code generation but lack the architectural thinking and quality assurance that define professional development."
        tags={['ai', 'engineering']}
      />
      <BlogrollEntry
        title="The reality of AI-Assisted software engineering productivity"
        href="https://addyo.substack.com/p/the-reality-of-ai-assisted-software"
        author="Addy Osmani"
        teaser="What the data really shows about AI coding tools in 2025. Most effective as assistants handling boilerplate, not as replacements for human judgment."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Leadership co-processing with LLMs"
        href="https://theengineeringmanager.substack.com/p/leadership-co-processing-with-llms"
        author="The Engineering Manager"
        teaser="LLMs can be powerful thinking partners for engineering leaders. Using them creatively for brainstorming and decision analysis sharpens your leadership."
        tags={['ai', 'leadership']}
      />
      <BlogrollEntry
        title="Building stronger engineering teams with aligned autonomy"
        href="https://stackoverflow.blog/2025/07/14/building-stronger-engineering-teams-with-aligned-autonomy/"
        author="Stack Overflow"
        teaser="Teams perform best when individual autonomy aligns with shared goals. Give engineers clear direction and freedom to solve problems their way."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Context Engineering: Bringing Engineering Discipline to Prompts"
        href="https://addyo.substack.com/p/context-engineering-bringing-engineering"
        author="Addy Osmani"
        teaser="Effective AI prompting requires the same information architecture rigor we apply to software. Structure context intentionally for consistently better outputs."
        tags={['ai']}
      />
      <BlogrollEntry
        title="It's Time to Be the Bad Guy"
        href="https://annajmcdougall.medium.com/its-time-to-be-the-bad-guy-76d14e8f64db"
        author="Anna J McDougall"
        teaser="Strong engineering managers protect their teams by absorbing difficult decisions. Taking ownership means sometimes being the one who makes unpopular calls."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="How Airbnb Smoothly Upgrades React"
        href="https://medium.com/airbnb-engineering/how-airbnb-smoothly-upgrades-react-b1d772a565fd"
        author="Airbnb Engineering"
        teaser="Incremental infrastructure modernization avoids the risk of full rewrites. Airbnb's approach to rolling out new React features while maintaining stability."
        tags={['frontend', 'engineering']}
      />
      <BlogrollEntry
        title="Leadership Strategies for Product Maturity Phases"
        href="https://abdulapopoola.com/2024/07/10/engineering-strategies-for-navigating-product-maturity-from-startup-to-scale/"
        author="Abdul A. Popoola"
        teaser="Engineering challenges shift as products mature. Startup hustle, scaleup organization, and enterprise reliability each demand different strategies."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Leading while learning"
        href="https://zendesk.engineering/leading-while-learning-why-great-managers-dont-have-all-the-answers-f297cc383d01"
        author="Bence A. Toth"
        teaser="Effective leadership isn't about having all answers. Create psychological safety where learning is expected, failure is normalized, and your team drives innovation."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Shipping incrementally"
        href="https://zahra.dev/blog/shipping-incrementally/"
        author="Zahra Jabeen"
        teaser="Continuous incremental shipping beats ambitious batches. Regular releases reduce risk, gather feedback faster, and keep momentum strong."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Catching Compromised Cookies"
        href="https://slack.engineering/catching-compromised-cookies/"
        author="Slack Engineering"
        teaser="Cookies are ubiquitous client-side state flowing across every request, making them a critical security surface. How Slack detects and mitigates compromised session cookies."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Design Docs at Google"
        href="https://www.industrialempathy.com/posts/design-docs-at-google/"
        author="Irakli Nadareishvili"
        teaser="Design docs are a cornerstone of Google's engineering culture, serving as the mechanism for aligning teams and capturing architectural reasoning before code is written."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Avoiding Skill Atrophy in the Age of AI"
        href="https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age"
        author="Addy Osmani"
        teaser="AI coding assistants can accelerate delivery but risk eroding the fundamentals that make engineers effective. Strategies to maintain depth while leveraging AI."
        tags={['ai', 'career']}
      />
      <BlogrollEntry
        title="DORA Metrics At Work"
        href="https://medium.com/booking-com-development/dora-metrics-at-work-46c835a86a89"
        author="Egor Savochkin"
        teaser="Booking.com doubled their team's delivery performance in a year by systematically measuring and improving the four DORA metrics."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Balancing Old Tricks with New Feats: AI-Powered Enzyme to RTL Migration at Slack"
        href="https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack/"
        author="Slack Engineering"
        teaser="Slack open-sourced their AI-driven migration tool that automatically converts Enzyme tests to React Testing Library, balancing modernization with preservation of testing intent."
        tags={['ai', 'frontend']}
      />
      <BlogrollEntry
        title="Platform as a Runtime"
        href="https://www.infoq.com/articles/platform-runtime-engineering/"
        author="InfoQ"
        teaser="As systems scale, platforms must evolve into managed runtimes that abstract complexity and cognitive load. Moving from passive infrastructure to active runtime enablers."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Questionable Advice: My boss says we don't need any engineering managers"
        href="https://charity.wtf/2024/01/05/questionable-advice-my-boss-says-we-dont-need-any-engineering-managers-is-he-right/"
        author="Charity Majors"
        teaser="Navigating a startup culture that rejects management infrastructure. When flat structures work and when they create scaling friction."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Solving staffing challenges with concentric circles"
        href="https://theengineeringmanager.substack.com/p/solving-staffing-challenges-with"
        author="The Engineering Manager"
        teaser="Rather than top-down reorganization, solve staffing problems from the inside out using concentric circles to progressively expand and restructure teams."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Technical Debt Financing"
        href="https://jackdanger.com/technical-debt-financing/"
        author="Jack Danger"
        teaser="Technical debt is a strategic tool for CTOs, not a burden to minimize. When managed intentionally as a financing mechanism, it accelerates delivery without sacrificing velocity."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="How (some) good corporate engineering blogs are written"
        href="https://danluu.com/corp-eng-blogs/"
        author="Dan Luu"
        teaser="Great corporate engineering blogs share specific technical insights rather than abstract principles. They succeed by writing about real problems and trade-offs."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Unexpected Anti-Patterns for Engineering Leaders"
        href="https://review.firstround.com/unexpected-anti-patterns-for-engineering-leaders-lessons-from-stripe-uber-carta/"
        author="Will Larson"
        teaser="What looks like a management mistake often works surprisingly well. Larson challenges three conventional anti-patterns that actually drive results at high-performing companies."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="All I Need to Know About Engineering Leadership I Learned From Leave No Trace"
        href="https://jacobian.org/2024/jul/12/lnt-for-engineering-leadership/"
        author="Jacob Kaplan-Moss"
        teaser="Apply wilderness ethics to engineering leadership: leave systems cleaner than you found them, minimize your footprint, and respect the team's capacity."
        tags={['leadership']}
      />
      <BlogrollEntry
        title="Engineering Metrics Guide"
        href="https://refactoring.fm/p/how-to-get-started-with-engineering"
        author="Refactoring"
        teaser="Skip the metrics theater. How to design a minimal, effective process that uses the right metrics to drive real improvements in engineering productivity."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Knowledge Silos: The Engineering Productivity Tax"
        href="https://leadership.garden/knowledge-silos/"
        author="Leadership Garden"
        teaser="Knowledge silos compound every other technical debt. Practical strategies to identify and break them down before they paralyze your team."
        tags={['engineering', 'leadership']}
      />
      <BlogrollEntry
        title="Design System Ecosystem"
        href="https://bigmedium.com/ideas/design-system-ecosystem.html"
        author="Brad Frost"
        teaser="A mature design system isn't a library, it's an ecosystem. How components, tokens, and governance scale across complex organizations."
        tags={['frontend']}
      />
      <BlogrollEntry
        title="Efficient Design System"
        href="https://bigmedium.com/ideas/design-system-pace-layers-slow-fast.html"
        author="Josh Clark"
        teaser="Design systems should move slower than the products they serve, yet still enable rapid iteration. How deliberate pace prevents bottlenecks."
        tags={['frontend']}
      />
      <BlogrollEntry
        title="Advanced Context Engineering for Coding Agents"
        href="https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md"
        author="HumanLayer"
        teaser="Agents reason better with structured context. How to engineer context quality so agents understand code intent and constraints."
        tags={['ai']}
      />
      <BlogrollEntry
        title="Software Engineering at Google: Large-Scale Testing"
        href="https://abseil.io/resources/swe-book/html/ch22.html"
        author="Google Engineering"
        teaser="Google's testing playbook: test size taxonomy, test selection strategies, and how to scale CI/CD without creating brittleness or slow feedback loops."
        tags={['engineering']}
      />
      <BlogrollEntry
        title="Compile-time expressions for TypeScript"
        href="https://comptime.js.org/"
        author="Comptime"
        teaser="Move computation from runtime to build time. A Vite plugin that evaluates TypeScript expressions at compile time for smaller bundles and better performance."
        tags={['frontend']}
      />
    </section>
  </>
);

export default Blogroll;
