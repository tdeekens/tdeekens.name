export type TBlogrollEntry = {
  title: string;
  href: string;
  author: string;
  teaser: string;
  tags?: string[];
  addedAt: string;
};

export const blogroll: TBlogrollEntry[] = [
  {
    title: 'Working with the CEO',
    href: 'https://blog.kevingoldsmith.com/2026/07/08/working-with-the-ceo/',
    author: 'Kevin Goldsmith',
    teaser:
      'CEOs hold hiring power but depend on technical judgment they cannot independently evaluate. The partnership survives on candor and shared context, not technical competence alone.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'React Compiler Is a Retrofit',
    href: 'https://longho.dev/posts/react-compiler-is-a-retrofit/',
    author: 'Long Ho',
    teaser:
      'React Compiler retrofits optimization into existing code rather than requiring architectural redesign. The approach treats compilation as pragmatic enhancement, adoptable without forcing developers toward new patterns.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'What Is Loop Engineering',
    href: 'https://newsletter.pragmaticengineer.com/p/what-is-loop-engineering',
    author: 'Gergely Orosz',
    teaser:
      'Loop engineering automates repetitive AI prompting by designing systems where agents run toward defined goals. Developers report drift and cost concerns, suggesting loops suit specific workflows rather than universal application.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Code Yellow, Code Red',
    href: 'https://theengineeringmanager.substack.com/p/code-yellow-code-red',
    author: 'The Engineering Manager',
    teaser:
      'Code Yellows and Code Reds formalize escalation protocols for infrastructure crises across Meta, LinkedIn, and Shopify. Success requires clear problem statements, measurable exit criteria, and cross-functional authority.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Laws of Software Project Management',
    href: 'https://lucasfcosta.com/blog/laws-of-software-project-management',
    author: 'Lucas F. Costa',
    teaser:
      'Software projects fail not from poor execution but from ignoring uncertainty in scope and deadlines. Successful delivery requires adaptive scope, incremental validation, and cross-functional viability from the start.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Own the Outer Loop',
    href: 'https://addyo.substack.com/p/own-the-outer-loop',
    author: 'Addy Osmani',
    teaser:
      'Agents generate code faster than humans can review it. The boundary between automation and accountability must remain human; someone has to answer for what ships.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Why I Stopped Arguing With People',
    href: 'https://wangcong.org/2026-06-30-why-i-stopped-arguing-with-people.html',
    author: 'Cong Wang',
    teaser:
      'Winning arguments rarely changes minds; they just wound egos. Divergent viewpoints shipped beat ideas proven correct, since success comes from competitive advantage, not intellectual victory.',
    tags: ['career', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Harness Engineering for Self-Improvement',
    href: 'https://lilianweng.github.io/posts/2026-07-04-harness/',
    author: 'Lilian Weng',
    teaser:
      'Self-improving AI systems succeed through harness architecture, not raw capability. Workflow orchestration and persistent memory outweigh model weights; human stewardship remains essential throughout the loop.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Three Bad Managers',
    href: 'https://randsinrepose.com/archives/three-bad-managers/',
    author: 'Michael Lopp',
    teaser:
      'Senior managers seldom change; people adapt to them instead. The Artist demands written clarity, the Dictator responds to preparation and pushback, the Knife requires distance, and adjustment beats transformation.',
    tags: ['leadership', 'career'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Introducing Meerkat',
    href: 'https://blog.cloudflare.com/meerkat-introduction/',
    author: 'Cloudflare',
    teaser:
      'Meerkat eliminates leader-dependent bottlenecks in distributed consensus. All replicas write concurrently, and the trade-off is latency proportional to distance, ideal for consistency-critical control-plane state.',
    tags: ['engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Chat Control 1.0 vs 2.0',
    href: 'https://fightchatcontrol.eu/chat-control-overview',
    author: 'Fight Chat Control',
    teaser:
      'Two EU surveillance proposals advance in parallel. A temporary rule faced expiration then reinstatement in July 2026 while a permanent regulation deadlocks over voluntary versus mandatory scanning of private communications.',
    tags: ['engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Let AI Burn',
    href: 'https://www.wheresyoured.at/let-ai-burn/',
    author: 'Ed Zitron',
    teaser:
      'The AI industry survives on circular venture capital, not real demand. Hyperscalers consume 70% of revenues while subsidized pricing and relentless hype substitute for authentic user need.',
    tags: ['ai'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Write an Effective Design Document',
    href: 'https://refactoringenglish.com/excerpts/write-an-effective-design-doc/',
    author: 'Michael Lynch',
    teaser:
      "Design docs answer one question: what's the penalty for being wrong. Catching expensive decisions before implementation beats exhaustive specifications that move coding problems to the design phase.",
    tags: ['engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'The Four Pillars of Engineering Management',
    href: 'https://softwareleads.substack.com/p/the-four-pillars-of-engineering-management',
    author: 'Software Leads',
    teaser:
      "Engineering managers amplify team effectiveness through four responsibilities: people, technical, product, and delivery leadership. Each pillar's emphasis shifts with organizational context, but collectively they remove obstacles to success.",
    tags: ['leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'How Meta Sets Up Super IC Teams',
    href: 'https://news.theuncommonexecutive.com/p/how-to-get-the-most-out-of-your-super',
    author: 'The Uncommon Executive',
    teaser:
      "Meta's incubation teams succeed not through talent selection but organizational structure. Executive sponsorship, self-sufficient resources, clear customer problems, and advance scaling plans embed excellence beyond individual projects.",
    tags: ['leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'The Goldilocks Customizable Select Height',
    href: 'https://jakearchibald.com/2026/goldilocks-select-height/',
    author: 'Jake Archibald',
    teaser:
      'Custom select dropdowns need balanced sizing. Small pickers become unusable and oversized ones awkward, while calc-size() enables intrinsic sizing that respects viewport margins and minimum constraints without forcing unwanted expansion.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'A Lot of Software Engineering Is Becoming Engineering Leadership',
    href: 'https://newsletter.eng-leadership.com/p/a-lot-of-software-engineering-is',
    author: 'Eng Leadership',
    teaser:
      'AI commoditizes code production, so engineers write less but review more and bottleneck on decisions. Technical proficiency no longer differentiates; judgment about problem selection and trade-offs becomes the rare capability.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Software Is Made Between Commits',
    href: 'https://zed.dev/blog/introducing-deltadb',
    author: 'Zed',
    teaser:
      'Development conversation currently happens after commits, yet real collaboration occurs continuously. DeltaDB captures every operation as linked deltas, letting teams and agents work simultaneously while conversation and code remain connected.',
    tags: ['engineering', 'ai'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Managing Sideways',
    href: 'https://kevingoldsmith.substack.com/p/managing-sideways',
    author: 'Kevin Goldsmith',
    teaser:
      'Leaders assume authority drives adoption; teams comply temporarily then revert. Peer-driven change succeeds where mandates fail, since resistance framed as technical objection usually masks autonomy or identity concerns beneath.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'So You Want to Fix Your All Hands',
    href: 'https://randsinrepose.com/archives/so-you-want-to-fix-your-all-hands/',
    author: 'Michael Lopp',
    teaser:
      'All-hands meetings fail when perceived as leadership spectacle disconnected from daily work. Consistent structure, peer achievements, and mystery guests shift meetings from noise to information inoculation against gossip.',
    tags: ['leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Building Software Is Learning',
    href: 'https://registerspill.thorstenball.com/p/building-software-is-learning',
    author: 'Thorsten Ball',
    teaser:
      "Software teams gain velocity by treating development as continuous discovery. Collapsing the time from 'let me try something' to user feedback through daily shipping and narrow scope becomes the competitive moat.",
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: "NPM's Packument Size Limit",
    href: 'https://www.vlt.io/blog/packument-size-limits',
    author: 'vlt',
    teaser:
      'NPM registries maintain packuments that accumulate metadata for all versions. Drizzle ORM hit the 100MB ceiling after roughly 763 releases, preventing new publication to the registry for weeks.',
    tags: ['engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'The End of the People Manager',
    href: 'https://www.practicalengineering.management/p/the-end-of-the-people-manager',
    author: 'Practical Engineering Management',
    teaser:
      'AI capabilities are rendering the traditional dedicated people manager archetype obsolete. Engineering leaders must evolve from pure people management into design-focused roles to remain relevant.',
    tags: ['leadership', 'career'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'Cross-Team Pragmatics',
    href: 'https://philcalcado.com/2026/06/01/cross_team_pragmatics.html',
    author: 'Phil Calcado',
    teaser:
      'Cross-team collaboration dysfunction typically stems from organizational structure and cascading goal incoherence, not collaboration skills. Restructure to eliminate unnecessary dependencies rather than perfecting collaboration itself.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'The AI Industry Is Losing',
    href: 'https://www.wheresyoured.at/the-ai-industry-is-losing/',
    author: 'Ed Zitron',
    teaser:
      "Hyperscaler AI capex spending now exceeds free cash flow growth. OpenAI and Anthropic capture approximately two-thirds of the industry's claimed revenues, while other deployments accumulate losses across fragmented applications.",
    tags: ['ai', 'engineering'],
    addedAt: '2026-07-17T19:38:27.230Z',
  },
  {
    title: 'A Technical Deep Dive Into the New Raycast',
    href: 'https://www.raycast.com/blog/a-technical-deep-dive-into-the-new-raycast',
    author: 'Raycast',
    teaser:
      'A hybrid architecture pairing native shells with React shows web technology can deliver desktop feel without Chromium bloat. Cross-platform parity came from intentional choices about feel, not framework selection.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'The Last Six Months in LLMs in Five Minutes',
    href: 'https://simonwillison.net/2026/May/19/5-minute-llms/',
    author: 'Simon Willison',
    teaser:
      'Coding agents crossed into production-ready reliability while open-weight models exceeded expectations on consumer hardware. Model leadership shifted across providers five times in six months.',
    tags: ['ai'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'How to Avoid AI Code Slop',
    href: 'https://newsletter.eng-leadership.com/p/how-to-avoid-ai-code-slop',
    author: 'Eng Leadership',
    teaser:
      'AI-generated code passes the eye test while hiding subtle logical errors. Documenting intent before generation and automating surface checks catches design issues earlier than waiting on code review to find them.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'AI Is Too Expensive',
    href: 'https://www.wheresyoured.at/ai-is-too-expensive/',
    author: 'Ed Zitron',
    teaser:
      'Hyperscalers burned hundreds of billions on AI infrastructure without a clear path to profitability. Enterprise spend lacks measurable ROI, exposing the gap between executive narrative and what the unit economics actually support.',
    tags: ['ai'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Prosocial Contagion',
    href: 'https://andiroberts.com/citizenship/prosocial-behaviour-contagion-citizenship-leadership',
    author: 'Andi Roberts',
    teaser:
      'Individual actions propagate through social networks up to three degrees of separation. Modeling citizenship through visible behavior shifts organizational norms more reliably than any policy mandate.',
    tags: ['leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Claude Is Not Your Architect',
    href: 'https://www.hollandtech.net/claude-is-not-your-architect',
    author: 'Holland Tech',
    teaser:
      'AI agents are strong implementers but lack accountability and contextual judgment for the decisions that actually matter. Human debate about constraints and trade-offs still produces better architecture than deferring to confident but ungrounded machine output.',
    tags: ['ai', 'leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Year in Open Source',
    href: 'https://blog.rman.dev/year-in-open-source/',
    author: 'rman.dev',
    teaser:
      'Consistent contribution and visible work in open source accelerates growth past traditional career paths. Communication and community engagement earn recognition and responsibility faster than corporate ladders measure them.',
    tags: ['career', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Not So Locked In Anymore',
    href: 'https://simonwillison.net/2026/May/14/not-so-locked-in/',
    author: 'Simon Willison',
    teaser:
      "Coding agents drop the cost of porting between languages, turning stack choices from permanent lock-in into manageable technical debt. Bun's Zig to Rust migration hints at how fluid these decisions become.",
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Apple Silicon Costs More Than OpenRouter',
    href: 'https://www.williamangel.net/blog/2026/05/17/offline-llm-energy-use.html',
    author: 'William Angel',
    teaser:
      'Local LLM inference on Apple Silicon costs roughly 3x more per token than cloud providers once hardware depreciation is included. Speed and privacy, not raw cost, are what justify keeping inference on the machine.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'GitLab Act 2',
    href: 'https://about.gitlab.com/blog/gitlab-act-2/',
    author: 'GitLab',
    teaser:
      'GitLab restructures around five architectural bets and flattens hierarchies to position itself for machine-directed development. The premise is that agentic software construction requires fundamental platform redesign, not AI bolted on the side.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'LLMs Are Functions, Not Brains',
    href: 'https://james-pritchard.com/blog/llms-are-functions',
    author: 'James Pritchard',
    teaser:
      'Treating language models as autonomous agents adds latency and unpredictability. Typed input-output functions enable testability, composability, and debugging at lower cost than agentic workflows trying to reason their way to the same result.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'The Anatomy of an AI-Native Org',
    href: 'https://ajeygore.in/content/the-anatomy-of-an-ai-native-org',
    author: 'Ajey Gore',
    teaser:
      "AI collapses the translation layer between strategy and execution, eating most middle-management coordination. The 'what' expands while the 'how' shrinks, leaving judgment-heavy engineering and product roles as the only ones that scale.",
    tags: ['ai', 'leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'The Science of Social Loafing',
    href: 'https://www.corporate-rebels.com/blog/social-loafing',
    author: 'Corporate Rebels',
    teaser:
      'Group effort drops predictably as team size grows, an effect Ringelmann measured a century ago. Small autonomous units, radical transparency, and peer accountability counter it better than adding hierarchical oversight.',
    tags: ['leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'How to Finish Engineering Projects Early Without Added Stress',
    href: 'https://newsletter.eng-leadership.com/p/how-to-use-critical-chain-methodology',
    author: 'Eng Leadership',
    teaser:
      'Critical chain pools task buffers at the project level instead of padding individual estimates. Cutting estimates in half and tracking buffer consumption against progress surfaces scope creep weeks earlier than burndown charts.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Fix Delivery First',
    href: 'https://www.antmurphy.me/newsletter/fix-delivery-first',
    author: 'Ant Murphy',
    teaser:
      'Discovery, OKRs, and AI rarely help a struggling product org until delivery works. Slow release cycles and accumulated tech debt are the actual bottleneck, and everything strategic downstream treats symptoms instead of cause.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'The Design System Advantage Is Memory',
    href: 'https://learn.thedesignsystem.guide/p/the-design-system-advantage-is-memory',
    author: 'The Design System Guide',
    teaser:
      'Design system value lives in accessible organizational memory, not in the tooling. Agents make confident mistakes when decision history scatters across Slack and ADRs. Structure data and governance first, then layer orchestration on top.',
    tags: ['frontend', 'ai'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'You Taught the Company to Overload You',
    href: 'https://avivbenyosef.com/you-taught-the-company-to-overload-you/',
    author: 'Aviv Ben-Yosef',
    teaser:
      'Leaders who always say yes erase their own judgment and train the organization to keep demanding more. Making commitment costs visible and holding operational boundaries breaks the loop before it becomes the role.',
    tags: ['leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Migrating from Go to Rust',
    href: 'https://corrode.dev/learn/migration-guides/go-to-rust/',
    author: 'corrode',
    teaser:
      'Go validates at runtime through discipline and tools. Rust encodes correctness into compile-time types that prevent entire categories of bugs. The trade is steeper upfront complexity for dramatically fewer production incidents.',
    tags: ['engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Maintainability Sensors for Coding Agents',
    href: 'https://martinfowler.com/articles/sensors-for-coding-agents.html',
    author: 'Martin Fowler',
    teaser:
      'Coding agents produce better code when given real-time feedback loops like linting, dependency rules, and mutation testing. Computational analysis catches mechanics; semantic issues across files still need LLM interpretation to surface.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'State of the Software Engineering Job Market in 2026',
    href: 'https://newsletter.pragmaticengineer.com/p/state-of-the-job-market-2026',
    author: 'Gergely Orosz',
    teaser:
      'Tech hiring growth diverges by geography. The US and UK expanded while Germany and France contracted. AI engineering roles surged 50 to 100% at major firms, outpacing general software engineer recruitment.',
    tags: ['ai', 'career'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'AI-Assisted Engineers Are Burning Out',
    href: 'https://evilmartians.com/chronicles/ai-assisted-engineers-are-burning-out-is-this-fine',
    author: 'Evil Martians',
    teaser:
      'Code generation compresses work into shorter timeframes but concentrates cognitive load, replacing craft satisfaction with reviews and iteration. More output ships, less fulfillment remains, and burnout follows the density of thinking, not the hours.',
    tags: ['ai', 'career'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'Exception, Presence, Delegation',
    href: 'https://cutlefish.substack.com/p/tbm-422-exception-presence-delegation',
    author: 'John Cutler',
    teaser:
      'Three management motions form one system. Exceptions flag deviations, presence transfers tacit knowledge, delegation pushes authority to local expertise. Run any of them alone and you get dashboards no one reads or leaders trapped in every meeting.',
    tags: ['leadership'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: "Is AI Causing a Repeat of Frontend's Lost Decade?",
    href: 'https://mastrojs.github.io/blog/2026-05-23-is-AI-causing-a-repeat-of-frontends-lost-decade/',
    author: 'Mastro',
    teaser:
      'AI abstracts away manual coding the way frameworks abstracted browser mechanics, lowering both skill requirements and worker leverage. Leaky abstractions resurface when the tooling fails, and understanding the layer below stays non-negotiable.',
    tags: ['ai', 'frontend'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'The State of CSS Centering in 2026',
    href: 'https://css-tricks.com/the-state-of-css-centering-in-2026/',
    author: 'CSS-Tricks',
    teaser:
      'Centering looks simple but demands different analysis across Flexbox, Grid, and positioning. Modern properties like text-box and anchor-center finally close the historical precision gaps that older recipes papered over.',
    tags: ['frontend'],
    addedAt: '2026-05-27T22:31:10+02:00',
  },
  {
    title: 'You Need AI That Reduces Maintenance Costs',
    href: 'https://www.jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs',
    author: 'James Shore',
    teaser:
      'Productivity gains turn into permanent indenture if maintenance cost rises with output. Doubling code volume without halving its long-term cost leaves teams trapped under their own velocity.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Why Senior Developers Fail to Communicate Their Expertise',
    href: 'https://nair.sh/guides-and-opinions/communicating-your-expertise/why-senior-developers-fail-to-communicate-their-expertise',
    author: 'Nair',
    teaser:
      'Seniors talk in complexity while the business talks in uncertainty. Reframing expertise as a solution to speed problems shifts seniors from objectors into editors of rapid AI-generated output.',
    tags: ['leadership', 'career'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Open Source Resistance',
    href: 'https://ossresistance.com/',
    author: 'Open Source Resistance',
    teaser:
      'Maintainers should treat OSS work on company time as legitimate professional work, not a side hustle. A direct-action stance on balancing corporate value extraction with maintainer sustainability.',
    tags: ['engineering'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'How I Moved My Digital Stack to Europe',
    href: 'https://monokai.com/articles/how-i-moved-my-digital-stack-to-europe/',
    author: 'Monokai',
    teaser:
      'European infrastructure providers run at production quality for most workloads. A two-month migration shows sovereignty is feasible; keep US services only where the context-specific advantage outweighs the cost.',
    tags: ['engineering'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Agile in the Age of AI',
    href: 'https://miren.dev/blog/agile-in-the-age-of-ai/',
    author: 'Miren',
    teaser:
      "AI authors code at scale while humans shift to editor and director. The constraint is not technology but the human cognitive ceiling and the 24/7 pressure that erodes Agile's core principle.",
    tags: ['ai', 'leadership'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Common Engineering Strategy Failure Factors',
    href: 'https://learnings.aleixmorgadas.dev/p/common-engineering-strategy-failure',
    author: 'Aleix Morgadas',
    teaser:
      'Technical decisions dominate engineering strategy while human alignment, communication, and realistic planning get skipped. Execution lives in those overlooked organizational factors, not the architecture diagram.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Being Strategic: What That Actually Means',
    href: 'https://blog.jgefroh.com/p/being-strategic',
    author: 'J. Gefroh',
    teaser:
      'Strategic thinking is a teachable progression of analytical habits, not an innate trait that separates executives from managers. Moving up requires unlearning the habits that worked one level down.',
    tags: ['leadership', 'career'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Build the Right Thing',
    href: 'https://mikefisher.substack.com/p/build-the-right-thing',
    author: 'Mike Fisher',
    teaser:
      'Premature financial validation kills discovery. Early-stage product needs financials as guardrails, not goals, so teams optimize for customer outcomes instead of spreadsheet output.',
    tags: ['leadership'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'The Brag Doc',
    href: 'https://ben.balter.com/2026/04/27/the-brag-doc/',
    author: 'Ben Balter',
    teaser:
      'A weekly five-minute record of impact protects your work from recency bias and review-cycle amnesia. Product-manage your career using shipped outcomes, not memory.',
    tags: ['career', 'leadership'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Sandboxes and Worktrees: My Secure Agentic AI Setup in 2026',
    href: 'https://mikemcquaid.com/sandboxed-agent-worktrees-my-coding-and-ai-setup-in-2026/',
    author: 'Mike McQuaid',
    teaser:
      'Stop babysitting one agent at a time. Sandboxes let them run wild safely and git worktrees let them run in parallel, trading more tokens for measurable velocity.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'How Engineering Leaders Calculate AI ROI',
    href: 'https://rdel.substack.com/p/rdel-141-how-can-engineering-leaders',
    author: 'Research-Driven Engineering Leadership',
    teaser:
      'AI amplifies the system you already have rather than fixing it. Expect a productivity dip over three months before compounding gains arrive, with realistic first-year ROI around 39%.',
    tags: ['ai', 'leadership'],
    addedAt: '2026-05-14T21:34:42+02:00',
  },
  {
    title: 'Managing Context in Long-Run Agentic Applications',
    href: 'https://slack.engineering/managing-context-in-long-run-agentic-applications/',
    author: 'Slack Engineering',
    teaser:
      'Multi-agent systems collapse under accumulated message history. Slack uses structured journals, credibility scoring, and consolidated timelines to keep coherence across hundreds of requests without passing raw history forward.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'The Shift to Managing Managers',
    href: 'https://blog.kevingoldsmith.com/2026/04/29/the-shift-to-managing-managers/',
    author: 'Kevin Goldsmith',
    teaser:
      'Hands-on managers who keep solving problems directly stall the layer below them. The lever shifts to enabling other managers through shared context, multiplying impact precisely when you step away.',
    tags: ['leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Rift',
    href: 'https://christophermeiklejohn.com/ai/personal/phish/flow/agents/2026/05/03/rift.html',
    author: 'Christopher Meiklejohn',
    teaser:
      'Thirty years of writing code with Phish on dissolved when managing agents replaced hands-on work. The trade buys leverage but surfaces a harder question: where does flow live in a queue-driven workflow?',
    tags: ['ai', 'career'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: "Managing a Team That Didn't Choose You",
    href: 'https://newsletter.manager.dev/p/managing-a-team-that-didn-t-choose-you',
    author: 'Anton Zaides',
    teaser:
      "The 30-60-90 onboarding plan breaks on inherited teams. Reading context first, fractured morale, structural gaps, unmet needs, beats imposing a template that ignores what's already there.",
    tags: ['leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'How React Streams UI Out of Order',
    href: 'https://inside-react.vercel.app/blog/how-react-streams-ui-out-of-order',
    author: 'Sankalpa Acharya',
    teaser:
      'React decouples delivery from completion. Fast components ship immediately with placeholder markers while slow resolvers fill in asynchronously, turning streaming into a composition primitive.',
    tags: ['frontend'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: '10 Lessons for Agentic Coding',
    href: 'https://www.dbreunig.com/2026/05/04/10-lessons-for-agentic-coding.html',
    author: 'Drew Breunig',
    teaser:
      'When code is cheap, the moat shifts. Value lives in identifying genuinely hard problems and navigating their complexity, not in automating trivial generation.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: '4 Behaviors That Make You Look Junior',
    href: 'https://alifeengineered.substack.com/p/4-behaviors-that-make-you-look-junior',
    author: 'A Life Engineered',
    teaser:
      'Visible irritation, emotional bleed, defensive responses, and pessimism erode credibility faster than weak work. Composure under stress is the signal senior looks like from the outside.',
    tags: ['career', 'leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Pushing Local Models With Focus and Polish',
    href: 'https://lucumr.pocoo.org/2026/5/8/local-models/',
    author: 'Armin Ronacher',
    teaser:
      'Local inference fails on fragmentation, not capability. Picking one configuration and treating every failure as a product bug builds confidence faster than chasing breadth across hardware and models.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Becoming a Business Leader, Not Just a Technical One',
    href: 'https://kevingoldsmith.substack.com/p/becoming-a-business-leader-not-just',
    author: 'Kevin Goldsmith',
    teaser:
      'Senior engineers plateau at the business fluency ceiling, not the technical one. Translating technical choices into revenue impact and customer consequence is the work that earns a seat at the table.',
    tags: ['leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Why Engineering Teams Swing Between Process Extremes',
    href: 'https://blog.incrementalforgetting.tech/p/the-tech-pendulum',
    author: 'Incremental Forgetting',
    teaser:
      'Trade-offs are permanent, not solvable, so teams oscillate instead of settling. Healthier course corrections come from watching direction of movement, not chasing the next opposite.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Projecting React',
    href: 'https://tannerlinsley.com/posts/projecting-react',
    author: 'Tanner Linsley',
    teaser:
      "React's API becomes a specification, not the implementation. An AI-generated lightweight variant lands ~9KB client and 2-3x faster SSR by treating the API surface as a target rather than a source.",
    tags: ['frontend', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Accessibility in React: Common Mistakes and How to Fix Them',
    href: 'https://certificates.dev/blog/accessibility-in-react-common-mistakes-and-how-to-fix-them',
    author: 'Certificates.dev',
    teaser:
      'Semantic HTML, proper labels, focus management in SPAs, and live regions cover most accessibility failures. Native elements do the work for free.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Behind the Scenes Hardening Firefox',
    href: 'https://hacks.mozilla.org/2026/05/behind-the-scenes-hardening-firefox/',
    author: 'Mozilla Hacks',
    teaser:
      'AI-powered bug hunting surfaced 271 Firefox vulnerabilities by steering agents to generate and validate hypotheses. Models finally got capable enough to separate signal from slop.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: "Why Can't They Just? Revisited",
    href: 'https://larahogan.me/blog/why-cant-they-just-revisited/',
    author: 'Lara Hogan',
    teaser:
      'Frustration masks incomplete context. Leaders shift the question toward collaborative problem-solving, acknowledging real constraints while identifying where influence actually exists.',
    tags: ['leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Local AI Needs to Be the Norm',
    href: 'https://unix.foo/posts/local-ai-needs-to-be-norm/',
    author: 'unix.foo',
    teaser:
      'On-device AI eliminates vendor dependencies, privacy baggage, and network fragility. You build trust by not needing a privacy policy in the first place.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'Sometimes Your Job is to Get in the Way',
    href: 'https://randsinrepose.com/archives/sometimes-your-job-is-to-get-in-the-way/',
    author: 'Rands',
    teaser:
      'Effective leadership demands knowing when to step back and when to decisively intervene. The discipline is not picking a stance, it is recognizing which moment you are in.',
    tags: ['leadership'],
    addedAt: '2026-05-11T13:50:47+02:00',
  },
  {
    title: 'The AI Coding Agent Manifesto',
    href: 'https://medium.com/wix-engineering/the-ai-coding-agent-manifesto-c8f61629d677',
    author: 'Wix Engineering',
    teaser:
      'Generation speed is no longer the bottleneck. Production-grade agent work shifts focus to verification, explicit contracts, and architectural clarity the agent can actually execute.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: "What's In It For Me Architecture",
    href: 'https://frederickvanbrabant.com/blog/2026-04-04-whats-in-it-for-me-architecture/',
    author: 'Frederick Vanbrabant',
    teaser:
      'Technical excellence alone does not ship. Architects succeed by reading stakeholder motivations and building credibility with decision-makers, not by drawing better diagrams.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Where Feedback Goes to Die',
    href: 'https://www.bonnycode.com/posts/where-feedback-goes-to-die/',
    author: 'BonnyCode',
    teaser:
      'Feedback turns actionable only when leaders stop judging and start listening. Real change requires earning trust through curiosity, not defending against the signal.',
    tags: ['leadership'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: "Why Isn't Everything Different Yet?",
    href: 'https://davegriffith.substack.com/p/why-isnt-everything-different-yet',
    author: 'Dave Griffith',
    teaser:
      'Transformative technology takes decades to reshape society. AI is moving faster than historical norms yet still feels glacial because expectations outpace physics.',
    tags: ['ai'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'LateOn-Code and ColGrep: Code Retrieval for Agents',
    href: 'https://huggingface.co/blog/lightonai/colgrep-lateon-code',
    author: 'LightOn AI',
    teaser:
      'LightOn shipped semantic code search models that beat much larger alternatives, plus ColGrep for local hybrid search. Agents find relevant code measurably faster.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'DigitalOcean to Hetzner: $1,432 to $233/month With Zero Downtime',
    href: 'https://isayeter.com/posts/digitalocean-to-hetzner-migration/',
    author: 'Ismail Sayeter',
    teaser:
      'A zero-downtime migration of 248 GB of MySQL, 34 Nginx sites, GitLab, and Neo4j cuts the bill by 84%. Cloud pricing turns inefficient fast once your workload stops being spiky.',
    tags: ['engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Laws of Software Engineering',
    href: 'https://lawsofsoftwareengineering.com/',
    author: 'Laws of Software Engineering',
    teaser:
      'A catalog of principles covering architecture, teams, and decision-making. Read together they reveal that software reflects organizational structure and human constraints more than technology.',
    tags: ['engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'The Critical Shift in What Differentiates Great Leaders',
    href: 'https://news.theuncommonexecutive.com/p/feelings-over-logic',
    author: 'The Uncommon Executive',
    teaser:
      'AI commoditizes knowledge and makes raw intellect table stakes. Leaders now differentiate on emotional wisdom, ethical judgment, and creativity, the parts algorithms still miss.',
    tags: ['leadership', 'ai'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Do I Belong in Tech Anymore?',
    href: 'https://ky.fyi/posts/ai-burnout',
    author: 'ky.fyi',
    teaser:
      "AI saturation breeds exhaustion, not from the tools but from unreviewed code and pressure to adopt without consent. The burnout here is grief over the field's abandoned ideals.",
    tags: ['ai', 'career'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: "Moving Railway's Frontend Off Next.js",
    href: 'https://blog.railway.com/p/moving-railways-frontend-off-nextjs',
    author: 'Railway',
    teaser:
      'Railway swapped Next.js for Vite plus TanStack Router and cut build times from 10+ minutes to under two. Framework choice matters more than hype when iteration speed is the moat.',
    tags: ['frontend'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'AI Should Elevate Your Thinking, Not Replace It',
    href: 'https://www.koshyjohn.com/blog/ai-should-elevate-your-thinking-not-replace-it/',
    author: 'Koshy John',
    teaser:
      'AI removes drudgery, but outsourcing understanding creates a quiet intellectual dependency. Judgment and adaptability stay irreplaceable; tools can only extend them.',
    tags: ['ai', 'career'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'The React Compiler at Eighteen Months',
    href: 'https://saschb2b.com/blog/react-compiler-year-in-review',
    author: 'Sasha Baranov',
    teaser:
      'Eighteen months in, the compiler auto-memoizes components and retires an entire bug class. Greenfield adoption is smooth; brownfield migrations still surface the rough edges.',
    tags: ['frontend'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: "AI's Economics Don't Make Sense",
    href: 'https://www.wheresyoured.at/ais-economics-dont-make-sense/',
    author: 'Ed Zitron',
    teaser:
      'Subscription pricing has been hiding the real per-token cost of AI products. As billing shifts to usage-based, the unit economics underneath the industry start to unravel.',
    tags: ['ai'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Resolve Merge Conflicts the Easy Way',
    href: 'https://haacked.com/archive/2026/03/25/resolve-merge-conflicts/',
    author: 'Phil Haack',
    teaser:
      'Structural merging via mergiraf plus a Claude Code skill turns conflict resolution into a workflow, not a slog. Tools handle syntax-aware merges so you only weigh in on genuine ambiguity.',
    tags: ['engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'The State of Engineering Management in 2026',
    href: 'https://olczyk.substack.com/p/the-state-of-engineering-management',
    author: 'Olczyk',
    teaser:
      'The middle layer of facilitation roles got squeezed as AI absorbed coordination work. Surviving engineering management demands either deep technical involvement or strategic portfolio leadership.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Ghostty Is Leaving GitHub',
    href: 'https://mitchellh.com/writing/ghostty-leaving-github',
    author: 'Mitchell Hashimoto',
    teaser:
      'A long-time GitHub user moves off the platform after repeated reliability failures in PRs, issues, and Actions. The pain point is the surrounding infrastructure, not git.',
    tags: ['engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'How to Be Direct and Strategic',
    href: 'https://news.theuncommonexecutive.com/p/how-to-be-direct-and-strategic',
    author: 'The Uncommon Executive',
    teaser:
      'Directness without strategy is just venting. Reading current beliefs and emotional impact before framing your message is what makes the same words actually land.',
    tags: ['leadership'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: "A Product Manager's Guide to Painted-Door Tests",
    href: 'https://crstanier.medium.com/a-product-managers-guide-to-painted-door-tests-a1a5de33b473',
    author: 'C.R. Stanier',
    teaser:
      'Painted-door tests gauge demand without engineering investment by showing fake features and measuring take-rate. A binary signal beats intuition before you commit resources.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'DO_NOT_TRACK: A Privacy Standard for CLIs',
    href: 'https://donottrack.sh/',
    author: 'DO_NOT_TRACK',
    teaser:
      'One environment variable replaces a patchwork of per-tool telemetry opt-outs. A single standard for CLI and TUI tools to respect user intent without bespoke flags.',
    tags: ['engineering'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'DeepSeek V4: Frontier Performance at a Fraction of the Price',
    href: 'https://simonwillison.net/2026/Apr/24/deepseek-v4/',
    author: 'Simon Willison',
    teaser:
      'DeepSeek V4-Pro and V4-Flash hit competitive frontier performance while undercutting price dramatically. Flash undercuts GPT-5.4 Nano, Pro undercuts every flagship.',
    tags: ['ai'],
    addedAt: '2026-05-03T15:20:34+02:00',
  },
  {
    title: 'Finding Comfort in the Uncertainty',
    href: 'https://annievella.com/posts/finding-comfort-in-the-uncertainty/',
    author: 'Annie Vella',
    teaser:
      'Forty of the sharpest minds in software gathered to map the AI-shaped future. The biggest takeaway. Nobody has it figured out, and that shared uncertainty is oddly the most useful answer.',
    tags: ['ai', 'career'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'What I Learned From Nearly 1,000 Interviews at Amazon',
    href: 'https://alifeengineered.substack.com/p/what-i-learned-from-nearly-1000-interviews',
    author: 'A Life Engineered',
    teaser:
      'A decade as an Amazon Bar Raiser, distilled into what actually separates strong candidates from the rest. Signal beats polish, and most interviewers look for the wrong things.',
    tags: ['leadership', 'career'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title:
      'Evaluating GenAI Features in Enterprise Software Requires a Human Touch',
    href: 'https://medium.com/@mbarrena/evaluating-genai-features-in-enterprise-software-requires-a-human-touch-9ab4a7f0fabf',
    author: 'Mario Barrena',
    teaser:
      'Automated benchmarks miss what actually matters in enterprise GenAI. Real quality signals come from humans in the loop, not leaderboards.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'The Uphill Climb of Making Diff Lines Performant',
    href: 'https://github.blog/engineering/architecture-optimization/the-uphill-climb-of-making-diff-lines-performant/',
    author: 'GitHub Engineering',
    teaser:
      'GitHub rebuilt diff rendering and found the win was not smarter code but less of it. The fastest path to performance often runs through simplicity.',
    tags: ['engineering', 'frontend'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'The Center Has a Bias',
    href: 'https://lucumr.pocoo.org/2026/4/11/the-center-has-a-bias/',
    author: 'Armin Ronacher',
    teaser:
      "The middle ground on AI isn't neutral. It's occupied by people who actually used the tools long enough to judge them. Non-use is not the same as balance.",
    tags: ['ai', 'leadership'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'AI Cybersecurity After Mythos: The Jagged Frontier',
    href: 'https://aisle.com/blog/ai-cybersecurity-after-mythos-the-jagged-frontier',
    author: 'Stanislav Fort',
    teaser:
      'Cybersecurity capability in LLMs is jagged. It does not scale smoothly with size, generation, or price. Small open-weights models matched a flagship on the same FreeBSD exploit at a fraction of the cost.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'The Economics of Software Teams',
    href: 'https://www.viktorcessan.com/the-economics-of-software-teams/',
    author: 'Viktor Cessan',
    teaser:
      'A team of eight engineers burns roughly 4,000 euros per working day, yet most organizations have no visibility into that number or what it takes to break even. Two decades of structural blindness now collides with the arrival of LLMs.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: '9 Stupid Power Moves Managers Make',
    href: 'https://yanivpreiss.com/2026/03/29/9-stupid-power-moves-managers-make-and-the-damage-they-leave-behind/',
    author: 'Yaniv Preiss',
    teaser:
      'Power moves spring from insecurity, not authority, and they quietly corrode trust. Nine common ones and the damage each leaves behind.',
    tags: ['leadership'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'How Does React Fiber Render Your UI',
    href: 'https://inside-react.vercel.app/blog/how-does-react-fiber-render-your-ui',
    author: 'Sankalpa Acharya',
    teaser:
      'Recursive rendering blocks the browser. Fiber slices work into ~5ms chunks so the main thread stays responsive. A walk through the linked-list tree of fiber nodes that powers interruptible reconciliation.',
    tags: ['frontend'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'Signals: The Push-Pull Based Algorithm',
    href: 'https://willybrauner.com/journal/signal-the-push-pull-based-algorithm',
    author: 'Willy Brauner',
    teaser:
      'Signals power Solid, Vue, and modern reactivity, yet few devs can explain their internals. Pushes notify downward, pulls re-evaluate upward, and together they keep reactive graphs efficient.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'The Vertical Codebase',
    href: 'https://tkdodo.eu/blog/the-vertical-codebase',
    author: 'Dominik Dorfmeister',
    teaser:
      'Organizing code by technical layer scales poorly once features cross boundaries. Slicing vertically by feature keeps related code colocated, reduces cross-cutting churn, and makes ownership obvious.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: "Under the Hood of MDN's New Frontend",
    href: 'https://developer.mozilla.org/en-US/blog/mdn-front-end-deep-dive/',
    author: 'Leo McArdle',
    teaser:
      'MDN rebuilt its frontend and unpacks the why. Lit-powered web components replace a tangle of four git repos, cutting friction for authors of interactive examples.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'Dropping Sprints: A Year with Shape Up',
    href: 'https://newsletter.manager.dev/p/dropping-sprints-a-year-with-shape-up',
    author: 'Anton Zaides',
    teaser:
      'One year after ditching Scrum for Shape Up, the team moved from maintenance mode to high output with happier engineers. Fixed time with variable scope beat the sprint treadmill.',
    tags: ['leadership', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'Uses for Nested Promises',
    href: 'https://blog.jcoglan.com/2026/03/23/uses-for-nested-promises/',
    author: 'James Coglan',
    teaser:
      'Promise.then() implicitly flattens nested promises, a choice that lost functional programmers the Promises/A+ debate but won on convenience. Real concurrency control code reveals rare but legitimate uses for keeping the nesting intact.',
    tags: ['engineering', 'frontend'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'React Server Components Your Way',
    href: 'https://tanstack.com/blog/react-server-components',
    author: 'Tanner Linsley',
    teaser:
      'RSCs became a paradigm you orbit around, not a primitive you reach for. TanStack reframes them as just streams of data the client fetches, caches, and composes. Powerful primitives lose their leverage the moment a framework makes them mandatory.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-18T14:17:45+02:00',
  },
  {
    title: 'Compile-time expressions for TypeScript',
    href: 'https://comptime.js.org/',
    author: 'Comptime',
    teaser:
      'Move computation from runtime to build time. A Vite plugin that evaluates TypeScript expressions at compile time for smaller bundles and better performance.',
    tags: ['frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Software Engineering at Google: Large-Scale Testing',
    href: 'https://abseil.io/resources/swe-book/html/ch22.html',
    author: 'Google Engineering',
    teaser:
      "Google's testing playbook: test size taxonomy, test selection strategies, and how to scale CI/CD without creating brittleness or slow feedback loops.",
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Advanced Context Engineering for Coding Agents',
    href: 'https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md',
    author: 'HumanLayer',
    teaser:
      'Agents reason better with structured context. How to engineer context quality so agents understand code intent and constraints.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Efficient Design System',
    href: 'https://bigmedium.com/ideas/design-system-pace-layers-slow-fast.html',
    author: 'Josh Clark',
    teaser:
      'Design systems should move slower than the products they serve, yet still enable rapid iteration. How deliberate pace prevents bottlenecks.',
    tags: ['frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Design System Ecosystem',
    href: 'https://bigmedium.com/ideas/design-system-ecosystem.html',
    author: 'Brad Frost',
    teaser:
      "A mature design system isn't a library, it's an ecosystem. How components, tokens, and governance scale across complex organizations.",
    tags: ['frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Knowledge Silos: The Engineering Productivity Tax',
    href: 'https://leadership.garden/knowledge-silos/',
    author: 'Leadership Garden',
    teaser:
      'Knowledge silos compound every other technical debt. Practical strategies to identify and break them down before they paralyze your team.',
    tags: ['engineering', 'leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Engineering Metrics Guide',
    href: 'https://refactoring.fm/p/how-to-get-started-with-engineering',
    author: 'Refactoring',
    teaser:
      'Skip the metrics theater. How to design a minimal, effective process that uses the right metrics to drive real improvements in engineering productivity.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      'All I Need to Know About Engineering Leadership I Learned From Leave No Trace',
    href: 'https://jacobian.org/2024/jul/12/lnt-for-engineering-leadership/',
    author: 'Jacob Kaplan-Moss',
    teaser:
      "Apply wilderness ethics to engineering leadership: leave systems cleaner than you found them, minimize your footprint, and respect the team's capacity.",
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Unexpected Anti-Patterns for Engineering Leaders',
    href: 'https://review.firstround.com/unexpected-anti-patterns-for-engineering-leaders-lessons-from-stripe-uber-carta/',
    author: 'Will Larson',
    teaser:
      'What looks like a management mistake often works surprisingly well. Larson challenges three conventional anti-patterns that actually drive results at high-performing companies.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How (some) good corporate engineering blogs are written',
    href: 'https://danluu.com/corp-eng-blogs/',
    author: 'Dan Luu',
    teaser:
      'Great corporate engineering blogs share specific technical insights rather than abstract principles. They succeed by writing about real problems and trade-offs.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Technical Debt Financing',
    href: 'https://jackdanger.com/technical-debt-financing/',
    author: 'Jack Danger',
    teaser:
      'Technical debt is a strategic tool for CTOs, not a burden to minimize. When managed intentionally as a financing mechanism, it accelerates delivery without sacrificing velocity.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Solving staffing challenges with concentric circles',
    href: 'https://theengineeringmanager.substack.com/p/solving-staffing-challenges-with',
    author: 'The Engineering Manager',
    teaser:
      'Rather than top-down reorganization, solve staffing problems from the inside out using concentric circles to progressively expand and restructure teams.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      "Questionable Advice: My boss says we don't need any engineering managers",
    href: 'https://charity.wtf/2024/01/05/questionable-advice-my-boss-says-we-dont-need-any-engineering-managers-is-he-right/',
    author: 'Charity Majors',
    teaser:
      'Navigating a startup culture that rejects management infrastructure. When flat structures work and when they create scaling friction.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Platform as a Runtime',
    href: 'https://www.infoq.com/articles/platform-runtime-engineering/',
    author: 'InfoQ',
    teaser:
      'As systems scale, platforms must evolve into managed runtimes that abstract complexity and cognitive load. Moving from passive infrastructure to active runtime enablers.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      'Balancing Old Tricks with New Feats: AI-Powered Enzyme to RTL Migration at Slack',
    href: 'https://slack.engineering/balancing-old-tricks-with-new-feats-ai-powered-conversion-from-enzyme-to-react-testing-library-at-slack/',
    author: 'Slack Engineering',
    teaser:
      'Slack open-sourced their AI-driven migration tool that automatically converts Enzyme tests to React Testing Library, balancing modernization with preservation of testing intent.',
    tags: ['ai', 'frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'DORA Metrics At Work',
    href: 'https://medium.com/booking-com-development/dora-metrics-at-work-46c835a86a89',
    author: 'Egor Savochkin',
    teaser:
      "Booking.com doubled their team's delivery performance in a year by systematically measuring and improving the four DORA metrics.",
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Avoiding Skill Atrophy in the Age of AI',
    href: 'https://addyo.substack.com/p/avoiding-skill-atrophy-in-the-age',
    author: 'Addy Osmani',
    teaser:
      'AI coding assistants can accelerate delivery but risk eroding the fundamentals that make engineers effective. Strategies to maintain depth while leveraging AI.',
    tags: ['ai', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Design Docs at Google',
    href: 'https://www.industrialempathy.com/posts/design-docs-at-google/',
    author: 'Irakli Nadareishvili',
    teaser:
      "Design docs are a cornerstone of Google's engineering culture, serving as the mechanism for aligning teams and capturing architectural reasoning before code is written.",
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Catching Compromised Cookies',
    href: 'https://slack.engineering/catching-compromised-cookies/',
    author: 'Slack Engineering',
    teaser:
      'Cookies are ubiquitous client-side state flowing across every request, making them a critical security surface. How Slack detects and mitigates compromised session cookies.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Shipping incrementally',
    href: 'https://zahra.dev/blog/shipping-incrementally/',
    author: 'Zahra Jabeen',
    teaser:
      'Continuous incremental shipping beats ambitious batches. Regular releases reduce risk, gather feedback faster, and keep momentum strong.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Leading while learning',
    href: 'https://zendesk.engineering/leading-while-learning-why-great-managers-dont-have-all-the-answers-f297cc383d01',
    author: 'Bence A. Toth',
    teaser:
      "Effective leadership isn't about having all answers. Create psychological safety where learning is expected, failure is normalized, and your team drives innovation.",
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Leadership Strategies for Product Maturity Phases',
    href: 'https://abdulapopoola.com/2024/07/10/engineering-strategies-for-navigating-product-maturity-from-startup-to-scale/',
    author: 'Abdul A. Popoola',
    teaser:
      'Engineering challenges shift as products mature. Startup hustle, scaleup organization, and enterprise reliability each demand different strategies.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How Airbnb Smoothly Upgrades React',
    href: 'https://medium.com/airbnb-engineering/how-airbnb-smoothly-upgrades-react-b1d772a565fd',
    author: 'Airbnb Engineering',
    teaser:
      "Incremental infrastructure modernization avoids the risk of full rewrites. Airbnb's approach to rolling out new React features while maintaining stability.",
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "It's Time to Be the Bad Guy",
    href: 'https://annajmcdougall.medium.com/its-time-to-be-the-bad-guy-76d14e8f64db',
    author: 'Anna J McDougall',
    teaser:
      'Strong engineering managers protect their teams by absorbing difficult decisions. Taking ownership means sometimes being the one who makes unpopular calls.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Context Engineering: Bringing Engineering Discipline to Prompts',
    href: 'https://addyo.substack.com/p/context-engineering-bringing-engineering',
    author: 'Addy Osmani',
    teaser:
      'Effective AI prompting requires the same information architecture rigor we apply to software. Structure context intentionally for consistently better outputs.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Building stronger engineering teams with aligned autonomy',
    href: 'https://stackoverflow.blog/2025/07/14/building-stronger-engineering-teams-with-aligned-autonomy/',
    author: 'Stack Overflow',
    teaser:
      'Teams perform best when individual autonomy aligns with shared goals. Give engineers clear direction and freedom to solve problems their way.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Leadership co-processing with LLMs',
    href: 'https://theengineeringmanager.substack.com/p/leadership-co-processing-with-llms',
    author: 'The Engineering Manager',
    teaser:
      'LLMs can be powerful thinking partners for engineering leaders. Using them creatively for brainstorming and decision analysis sharpens your leadership.',
    tags: ['ai', 'leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'The reality of AI-Assisted software engineering productivity',
    href: 'https://addyo.substack.com/p/the-reality-of-ai-assisted-software',
    author: 'Addy Osmani',
    teaser:
      'What the data really shows about AI coding tools in 2025. Most effective as assistants handling boilerplate, not as replacements for human judgment.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "Why LLMs Can't Really Build Software",
    href: 'https://zed.dev/blog/why-llms-cant-build-software',
    author: 'Zed',
    teaser:
      'Writing code is only one part of effective software engineering. LLMs excel at code generation but lack the architectural thinking and quality assurance that define professional development.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Going direct',
    href: 'https://theengineeringmanager.substack.com/p/going-direct',
    author: 'The Engineering Manager',
    teaser:
      'Effective organizations communicate fluidly across org chart boundaries rather than rigidly following reporting lines, accelerating decision-making.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How to Use Claude Code Subagents to Parallelize Development',
    href: 'https://zachwills.net/how-to-use-claude-code-subagents-to-parallelize-development/',
    author: 'Zach Wills',
    teaser:
      'Lessons from building a metrics tool using subagents to split work in parallel, demonstrating concrete patterns for AI-accelerated development workflows.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Just Talk To It',
    href: 'https://steipete.me/posts/just-talk-to-it',
    author: 'Peter Steinberger',
    teaser:
      'A grounded, practical approach to working with AI coding agents that cuts through hype and focuses on what actually works.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'BFCM Readiness 2025',
    href: 'https://shopify.engineering/bfcm-readiness-2025',
    author: 'Shopify Engineering',
    teaser:
      'Technical strategies and infrastructure patterns for handling peak traffic during Black Friday and Cyber Monday at scale.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Introducing advanced tool use',
    href: 'https://www.anthropic.com/engineering/advanced-tool-use',
    author: 'Anthropic',
    teaser:
      'Claude can now discover and dynamically execute tools in real-time, enabling AI agents to take actions directly in external systems without pre-integration.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "'Good engineering management' is a fad",
    href: 'https://lethain.com/good-eng-mgmt-is-a-fad/',
    author: 'Will Larson',
    teaser:
      'Challenges the assumption that modern management practices are universally correct, arguing context and organizational needs matter more than dogma.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: '21 Lessons from 14 Years at Google',
    href: 'https://addyo.substack.com/p/21-lessons-from-14-years-at-google',
    author: 'Addy Osmani',
    teaser:
      'Distilled wisdom on code quality, career progression, and the interpersonal dimensions of engineering drawn from nearly a decade and a half at scale.',
    tags: ['career', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "Rise of the 'operator EM'",
    href: 'https://medium.com/one-to-n/rise-of-the-operator-em-f1b9010b876e',
    author: 'One to N',
    teaser:
      'The playbook for engineering management has shifted in the post-ZIRP era, requiring managers to balance efficiency with the realities of constrained resources.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Useful engineering management artifacts',
    href: 'https://bjorg.bjornroche.com/management/engineering-management-artifacts/',
    author: 'Bjorn Roche',
    teaser:
      'Document templates and structural tools that help scaling engineering organizations maintain clarity and alignment as teams grow.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Building High-Performing Remote Engineering Teams',
    href: 'https://hansreinl.de/blog/remote-engineering-leadership',
    author: 'Hans Reinl',
    teaser:
      'Explores the distinct challenges and opportunities of leading engineering teams across distributed locations, moving beyond one-size-fits-all remote work policies.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'One bottleneck at a time',
    href: 'https://theengineeringmanager.substack.com/p/one-bottleneck-at-a-time',
    author: 'The Engineering Manager',
    teaser:
      'Manager instinct often says fix everything at once, but the easy way forward is paradoxically harder. Tackle bottlenecks sequentially to avoid chaos.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'The Next Two Years of Software Engineering',
    href: 'https://addyosmani.com/blog/next-two-years/',
    author: 'Addy Osmani',
    teaser:
      'Five critical questions are reshaping how we build software. Competing scenarios for each and what they mean for your choices today.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "The Architect's Guide to Micro-Frontends",
    href: 'https://developersvoice.com/blog/frontend/micro-frontends-with-react-and-angular/',
    author: 'Developers Voice',
    teaser:
      'Scale frontend architecture without scaling complexity. Module Federation enables independent teams to ship in parallel without coordination overhead.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Conflict Between Neurotypes',
    href: 'https://blog.izs.me/2025/11/ogc-4-conflict/',
    author: 'Isaac Z. Schlueter',
    teaser:
      "Neurodiversity isn't just about accommodation. It's about understanding how different thinking styles create friction in teams and how to navigate it.",
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Aligning Product and GTM with Customer Value Metrics',
    href: 'https://www.balderton.com/resources/aligning-product-and-gtm-with-customer-value-metrics/',
    author: 'Dan Teodosiu and Dave Kellogg',
    teaser:
      'When product and go-to-market strategies drift, founders lose leverage. How to align both around metrics that actually predict customer success.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "Things I've learned in my 10 years as an engineering manager",
    href: 'https://www.jampa.dev/p/lessons-learned-after-10-years-as',
    author: 'Jampa',
    teaser:
      'A decade of management experience distilled into non-obvious advice that changes how you think about leading engineers.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'The Deletion Test - The Phoenix Architecture',
    href: 'https://aicoding.leaflet.pub/3md5ftetaes2e',
    author: 'AI Coding',
    teaser:
      'A resilience pattern that tests whether your system can survive the removal of its own components. Architecture thinking at its most practical.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'AI is Killing B2B SaaS',
    href: 'https://nmn.gl/blog/ai-killing-b2b-saas',
    author: 'NMN',
    teaser:
      "The SaaS model's greatest strength becomes a liability as AI commoditizes once-differentiated products. The race for profitability just got harder.",
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Accelerate Next.js in Kubernetes',
    href: 'https://blog.platformatic.dev/93-faster-nextjs-in-your-kubernetes',
    author: 'Platformatic',
    teaser:
      'Performance gains matter in production. Practical optimizations to run Next.js faster in Kubernetes environments.',
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Navigating the Current Landscape: Growth Beyond the Ladder',
    href: 'https://victoravelar.dev/articles/2026/navigating-the-current-landscape-growth-beyond-the-ladder/',
    author: 'Victor Avelar',
    teaser:
      "Career growth isn't always up. Discover the three key motivators that matter in a saturated job market and why your next strategic move might be staying put.",
    tags: ['career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'One list to rule them all',
    href: 'https://theengineeringmanager.substack.com/p/one-list-to-rule-them-all',
    author: 'The Engineering Manager',
    teaser:
      'A deceptively simple framework for making hard decisions as an engineering leader by focusing on what matters most.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'My AI Adoption Journey',
    href: 'https://mitchellh.com/writing/my-ai-adoption-journey',
    author: 'Mitchell Hashimoto',
    teaser:
      "Real lessons from integrating AI tools into daily development work: what worked, what didn't, and how adoption patterns are changing how senior engineers operate.",
    tags: ['ai', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Agentic workers for commerce operations: a proof of concept',
    href: 'https://commercelayer.io/blog/agentic-workers-for-commerce-operations-poc',
    author: 'Commerce Layer',
    teaser:
      'How agentic AI workers with Mastra.ai and MCP can automate e-commerce operations end-to-end, reducing manual overhead significantly.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Agents 2.0: From Shallow Loops to Deep Agents',
    href: 'https://www.philschmid.de/agents-2.0-deep-agents',
    author: 'Philipp Schmid',
    teaser:
      'Move beyond simple request-response loops to deep agents that maintain state, reason over extended periods, and handle genuinely complex multi-step workflows.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Building Effective AI Agents',
    href: 'https://www.anthropic.com/engineering/building-effective-agents',
    author: 'Anthropic',
    teaser:
      "Anthropic's battle-tested principles for building reliable, production-ready AI agents that actually work at scale.",
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Agent Recipes',
    href: 'https://www.agentrecipes.com/',
    author: 'Agent Recipes',
    teaser:
      'Skip the experimentation phase with ready-to-use agent patterns and copy-paste code snippets designed to improve your LLM applications immediately.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'What are AI Agents? Why do they matter?',
    href: 'https://addyo.substack.com/p/what-are-ai-agents-why-do-they-matter',
    author: 'Addy Osmani',
    teaser:
      'Understand the evolution from simple automation to intelligent agents: their architecture, capabilities, and why they represent a fundamental shift in how we build software.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Agentic Coding Best Practices',
    href: 'https://benhouston3d.com/blog/agentic-coding-best-practices',
    author: 'Ben Houston',
    teaser:
      'As AI coding agents evolve from tools to collaborators, our code organization and documentation must evolve with them. How to structure projects for agent-friendly codebases.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How to build an Agent, On-Device Edition',
    href: 'https://ryanseddon.com/ai/how-to-build-an-agent-on-device/',
    author: 'Ryan Seddon',
    teaser:
      'Build fully functional agents using on-device models like Phi-4-mini in under 200 lines of code, bringing AI inference closer to users.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'MCP UI: Breaking the text wall with interactive components',
    href: 'https://shopify.engineering/mcp-ui-breaking-the-text-wall',
    author: 'Shopify Engineering',
    teaser:
      'MCP UI extends the Model Context Protocol to let AI agents return interactive components instead of just text, making agent outputs more actionable.',
    tags: ['ai', 'frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Built With Borrowed Hands',
    href: 'https://cra.mr/built-with-borrowed-hands/',
    author: 'Craig Condon',
    teaser:
      'What happens when you build production infrastructure using only AI agents writing code? A two-month experiment in agentic development constraints.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Why Using an LLM to Redact PII and PHI is a Bad Idea',
    href: 'https://blog.philterd.ai/why-using-an-llm-to-identify-and-redact-pii-and-phi-is-a-bad-idea/',
    author: 'Philterd',
    teaser:
      "Relying on LLMs for sensitive data redaction introduces hallucination risks where accuracy isn't optional. Deterministic approaches are essential.",
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'LangGraph for complex workflows',
    href: 'https://surma.dev/things/langgraph/',
    author: 'Surma',
    teaser:
      'LangGraph codifies complex workflow architectures as executable automations, giving structure to stateful AI reasoning.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'MCP: What It Is and Why It Matters',
    href: 'https://addyo.substack.com/p/mcp-what-it-is-and-why-it-matters',
    author: 'Addy Osmani',
    teaser:
      'The Model Context Protocol is creating a common language between AI and apps, enabling a new category of integrations and possibilities.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Something Big Is Happening',
    href: 'https://shumer.dev/something-big-is-happening',
    author: 'Matt Shumer',
    teaser:
      'A grounded take on what AI is actually changing for non-tech folks, cutting through the noise to explain real implications.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'On the Question of Debt',
    href: 'https://medium.com/mapai/on-the-question-of-debt-aca1125d4a62',
    author: 'MapAI',
    teaser:
      'Beyond technical debt: a framework for understanding four types of system debt including technical, evolutionary, and cognitive dimensions.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "Micro Frontends: When They Make Sense and When They Don't",
    href: 'https://lukasniessen.medium.com/micro-frontends-when-they-make-sense-and-when-they-dont-a1a06b726065',
    author: 'Lukas Niessen',
    teaser:
      "Microservices unlocked backend autonomy, but applying the same pattern to frontends isn't always the solution. When micro frontends genuinely add value.",
    tags: ['frontend', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Legitimate Power: Authority and Power are Not the Same Thing',
    href: 'https://www.leadingsapiens.com/legitimate-power/',
    author: 'Leading Sapiens',
    teaser:
      'Why do we comply with directives we privately question? The crucial distinction between power through fear and authority through legitimacy.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How we rebuilt Next.js with AI in one week',
    href: 'https://blog.cloudflare.com/vinext/',
    author: 'Cloudflare',
    teaser:
      'One engineer rebuilt Next.js on Vite with AI assistance, achieving 4x faster builds, 57% smaller bundles, and Workers deployment in a week.',
    tags: ['ai', 'frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'I Made MCP 94% Cheaper (And It Only Took One Command)',
    href: 'https://kanyilmaz.me/2026/02/23/cli-vs-mcp.html',
    author: 'Kan Yilmaz',
    teaser:
      'A concrete cost comparison between CLI and MCP approaches reveals surprising economics for agent deployment.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'MCP is dead. Long live the CLI',
    href: 'https://ejholmes.github.io/2026/02/28/mcp-is-dead-long-live-the-cli.html',
    author: 'EJ Holmes',
    teaser:
      'Why CLI-based patterns are winning over MCP for building AI agents and what it means for the tooling landscape.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Thinking tools: How to identify assumptions by distorting time',
    href: 'https://www.jonesabi.com/blog/thinking-tools-how-to-identify-assumptions-by-distorting-time',
    author: 'Abi Jones',
    teaser:
      'A practical technique for exposing hidden assumptions in your thinking by playing with timescales.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'AI should help us produce better code',
    href: 'https://simonwillison.net/guides/agentic-engineering-patterns/better-code/',
    author: 'Simon Willison',
    teaser:
      "Agentic patterns aren't about replacing engineers. They're about building systems that elevate code quality and developer productivity.",
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Management In The Age Of AI',
    href: 'https://staysaasy.com/management/2026/03/12/ai-management.html',
    author: 'Stay SaaSy',
    teaser:
      'The role of managers is evolving with AI, not disappearing. What changes and what stays the same.',
    tags: ['ai', 'leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      'How The New York Times is scaling Unit Test Coverage using AI Tools',
    href: 'https://open.nytimes.com/how-the-new-york-times-is-scaling-unit-test-coverage-using-ai-tools-fa796bf9b8d2',
    author: 'New York Times Engineering',
    teaser:
      "AI tools are helping engineers write better tests at scale, tackling one of engineering's persistent blind spots.",
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      'The Reason Most People Are Terrible Communicators (And How to Fix It)',
    href: 'https://alifeengineered.substack.com/p/the-reason-most-people-are-terrible',
    author: 'A Life Engineered',
    teaser:
      "Being right doesn't matter if nobody understands what you're saying. Learn the core gap between clarity and correctness.",
    tags: ['leadership', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Seven Years to TypeScript: Migrating 11,000 Files at Patreon',
    href: 'https://www.patreon.com/posts/seven-years-to-152144830',
    author: 'Patreon Engineering',
    teaser:
      'A decade-long journey of migrating an entire codebase to TypeScript reveals lessons about gradual modernization at scale.',
    tags: ['engineering', 'frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'What Really Happens in a Board Meeting',
    href: 'https://blog.kevingoldsmith.com/2026/02/18/what-really-happens-in-a-board-meeting/',
    author: 'Kevin Goldsmith',
    teaser:
      'Behind the polished presentations and formal agendas lies a messier reality about how decisions actually get made in board meetings.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Relocating Rigor - The Phoenix Architecture',
    href: 'https://aicoding.leaflet.pub/3mbrvhyye4k2e',
    author: 'AI Coding',
    teaser:
      'True rigor in modern systems often looks like apparent recklessness. The Phoenix Architecture challenges conventional wisdom about structure and control.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Becoming an AI-first software-intensive company',
    href: 'https://janbosch.com/blog/index.php/2026/02/03/becoming-an-ai-first-software-intensive-company/',
    author: 'Jan Bosch',
    teaser:
      "Transforming into an AI-first company isn't about tools. It's about fundamentally rethinking how software gets built and how engineering teams organize around that change.",
    tags: ['ai', 'leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Thoughts on slowing the fuck down',
    href: 'https://mariozechner.at/posts/2026-03-25-thoughts-on-slowing-the-fuck-down/',
    author: 'Mario Zechner',
    teaser:
      'A reflection on the cost of constant acceleration and what happens when you deliberately choose to slow down.',
    tags: ['ai', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'When a Manager Should Step In',
    href: 'https://www.dein.fr/posts/2026-03-17-when-a-manager-should-step-in',
    author: 'Charles-Axel Dein',
    teaser:
      'Knowing when to intervene as a manager is a skill distinct from knowing how. The difference between micromanagement and appropriate guidance lies in recognizing which moments actually require your involvement.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How To Handle Overly Confident And Combative Colleagues',
    href: 'https://news.theuncommonexecutive.com/p/how-to-handle-overly-confident-and',
    author: 'The Uncommon Executive',
    teaser:
      'When you need something from a defensive or hostile coworker, transaction-focused approaches backfire. The strategy requires reframing the relationship before the ask.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Anatomy of the .claude/ Folder',
    href: 'https://blog.dailydoseofds.com/p/anatomy-of-the-claude-folder',
    author: 'Daily Dose of DS',
    teaser:
      'The .claude folder is where you configure your entire Claude Code experience. How CLAUDE.md, custom commands, skills, agents, and permissions work together.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Claude Code - The Practical Guide',
    href: 'https://pro.academind.com/p/claude-code-the-practical-guide',
    author: 'Academind',
    teaser:
      'A hands-on guide to making Claude Code part of your actual development workflow.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'use(): The Hook That Breaks the Rules (On Purpose)',
    href: 'https://saschb2b.com/en/blog/use-hook-react',
    author: 'Sasha Baranov',
    teaser:
      "React's use() hook reads promises and context at render time without the complexity of useEffect. The missing piece that finally makes async patterns feel native to component rendering.",
    tags: ['frontend'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Better, Faster, and (Even) More',
    href: 'https://randsinrepose.com/archives/better-faster-and-even-more/',
    author: 'Rands',
    teaser:
      "A relentless focus on velocity led to building more interesting, random, and useless scripts and tools than ever before. Sometimes the best learning comes from building things that don't need to exist.",
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title:
      'The Alignment Tax: What a Real CTO Relationship Looks Like vs. a Fake One',
    href: 'https://insideproductorg.substack.com/p/the-alignment-tax-what-a-real-cto',
    author: 'Inside Product',
    teaser:
      'When a CTO is genuinely aligned with the business, the entire organization temperature shifts. Misalignment creates hidden friction that compounds across teams.',
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Reinventing the Pull Request',
    href: 'https://lubeno.dev/blog/reinventing-the-pull-request',
    author: 'Lubeno',
    teaser:
      'Code review catches bugs, but great review reduces comprehension debt. PRs should help teams understand the codebase faster, not just validate changes.',
    tags: ['engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Components of A Coding Agent',
    href: 'https://magazine.sebastianraschka.com/p/components-of-a-coding-agent',
    author: 'Sebastian Raschka',
    teaser:
      "Coding agents work when they combine three things well: tools, memory, and repository context. Understanding these components explains why some agents fail and others don't.",
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'How to be a Web Developer',
    href: 'https://stuffeverybodyknows.com/',
    author: 'Laurie Voss',
    teaser:
      "A roadmap for the career arc beyond your first years in web development, from someone who's lived it.",
    tags: ['career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Harness Engineering for Coding Agent Users',
    href: 'https://martinfowler.com/articles/harness-engineering.html',
    author: 'Martin Fowler',
    teaser:
      'Building reliable systems around AI agents requires intentional design patterns. Harness engineering treats the agent as a fallible component in a larger architecture.',
    tags: ['ai', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Reflection is a Crucial Leadership Skill',
    href: 'https://blog.kevingoldsmith.com/2026/04/01/reflection-is-a-crucial-leadership-skill/',
    author: 'Kevin Goldsmith',
    teaser:
      "Leaders who pause to examine what worked and what didn't gain insight that keeps them from repeating mistakes and compounds their effectiveness.",
    tags: ['leadership'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: "Your Engineers Aren't Lazy, Your Codebase Is Punishing Them",
    href: 'https://piechowski.io/post/codebase-drag-audit/',
    author: 'Piechowski',
    teaser:
      "Technical debt isn't an engineering morale problem. It's a code problem. A quick audit reveals whether you're fighting the system or the people.",
    tags: ['leadership', 'engineering'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'The Middle Loop',
    href: 'http://annievella.com/posts/the-middle-loop/',
    author: 'Annie Vella',
    teaser:
      'Time investment shapes thought patterns, which compound into skill. Where you focus your hours is where your expertise emerges.',
    tags: ['ai', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Say the Thing You Want',
    href: 'https://terriblesoftware.org/2026/04/01/say-the-thing-you-want/',
    author: 'Terrible Software',
    teaser:
      "Your silence at work isn't protecting you. It's costing you. Ask for what you actually need.",
    tags: ['leadership', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'AI Is Really Weird',
    href: 'https://www.wheresyoured.at/ai-is-really-weird/',
    author: 'Ed Zitron',
    teaser:
      'AI systems behave in ways that defy intuition and resist simple categorization. Understanding their weirdness is essential for anyone building with or around them.',
    tags: ['ai'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
  {
    title: 'Good Taste the Only Real Moat Left',
    href: 'https://rajnandan.com/posts/taste-in-the-age-of-ai-and-llms/',
    author: 'Raj Nandan',
    teaser:
      "AI commoditizes competence, but judgment becomes scarce. The real edge isn't in output quality but in pairing taste with context and the conviction to build something meaningful.",
    tags: ['ai', 'career'],
    addedAt: '2026-04-08T22:28:03+02:00',
  },
];
