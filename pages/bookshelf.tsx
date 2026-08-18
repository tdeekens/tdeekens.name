import Book from '@components/book';
import Text from '@components/text';
import Head from 'next/head';

const Bookshelf = () => (
  <>
    <Head>
      <title>Tobias Deekens (@tdeekens) - Bookshelf</title>
    </Head>

    <Text.Headline testId="bookshelf-heading" as="h1">
      Bookshelf
    </Text.Headline>

    <Text.Paragraph>
      A collection of some of the books I enjoyed. Some relate to work or
      programming, few to fiction and more are popular science.
    </Text.Paragraph>

    <section className="grid gap-4 my-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Book
        title="Bullshit Jobs: A Theory"
        href="https://amazon.de/-/en/Bullshit-Jobs-Theory-David-Graeber/dp/0141983477"
        src="/bookshelf/bullshit-jobs.jpg"
        author="David Graeber"
      />
      <Book
        title="The Five Dysfunctions of a Team"
        href="https://amazon.de/dp/0787960756"
        src="/bookshelf/five-dysfunctions.jpg"
        author="Patrick Lencioni"
      />
      <Book
        title="Clean Architecture"
        href="https://amazon.de/dp/0134494164"
        src="/bookshelf/clean-architecture.jpg"
        author="Robert C. Martin"
      />
      <Book
        title="A Philosophy of Software Design"
        href="https://amazon.de/dp/1732102201"
        src="/bookshelf/philosophy-software-design.jpg"
        author="John K. Ousterhout"
      />
      <Book
        title="Unlocking Leadership Mindtraps"
        href="https://amazon.de/dp/1503609014"
        src="/bookshelf/unlocking-leadership.png"
        author="Jennifer Garvey Berger"
      />
      <Book
        title="The Upstarts"
        href="https://amazon.de/dp/0316523135"
        src="/bookshelf/the-upstarts.jpg"
        author="Brad Stone"
      />
      <Book
        title="Essentialism: The Disciplined Pursuit of Less"
        href="https://amazon.de/dp/0804137404"
        src="/bookshelf/essentialism.jpg"
        author="Greg McKeown"
      />
      <Book
        title="System Design Interview"
        href="https://amazon.de/dp/B08CMF2CQF"
        src="/bookshelf/system-design-interview.jpg"
        author="Alex Xu"
      />
      <Book
        title="So Good They Can't Ignore You"
        href="https://amazon.de/dp/0349415862"
        src="/bookshelf/so-good-they-cant-ignore-you.jpg"
        author="Cal Newport"
      />
      <Book
        title="Scaling Fast"
        href="https://amazon.de/dp/1662964773"
        src="/bookshelf/scaling-fast.png"
        author="Yoav Shoham"
      />
      <Book
        title="Modern Software Engineering"
        href="https://amazon.de/dp/0137314914"
        src="/bookshelf/modern-software-engineering.jpg"
        author="David Farley"
      />
      <Book
        title="Engineering Management for the Rest of Us"
        href="https://amazon.de/dp/B0BHX6NLGZ"
        src="/bookshelf/engineering-management-rest-of-us.jpg"
        author="Sarah Drasner"
      />
      <Book
        title="Good Strategy/Bad Strategy"
        href="https://amazon.de/dp/1781256179"
        src="/bookshelf/good-strategy-bad-strategy.jpg"
        author="Richard Rumelt"
      />
      <Book
        title="Four Thousand Weeks"
        href="https://amazon.de/dp/1784704008"
        src="/bookshelf/four-thousand-weeks.jpg"
        author="Oliver Burkeman"
      />
      <Book
        title="Quit: The Power of Knowing When to Walk Away"
        href="https://amazon.de/dp/1529146151"
        src="/bookshelf/quit.jpg"
        author="Annie Duke"
      />
      <Book
        title="The Deficit Myth"
        href="https://amazon.de/dp/1529352568"
        src="/bookshelf/deficit-myth.jpg"
        author="Stephanie Kelton"
      />
      <Book
        title="Thinking in Systems"
        href="https://amazon.de/dp/1603580557"
        src="/bookshelf/thinking-in-systems.jpg"
        author="Donella H. Meadows"
      />
      <Book
        title="Make Time"
        href="https://amazon.de/dp/0593079582"
        src="/bookshelf/make-time.jpg"
        author="Jake Knapp"
      />
      <Book
        title="The 15 Commitments of Conscious Leadership"
        href="https://amazon.de/dp/0990976904"
        src="/bookshelf/15-commitments.jpg"
        author="Jim Dethmer"
      />
      <Book
        title="Building Micro-Frontends"
        href="https://amazon.de/dp/1492082996"
        src="/bookshelf/building-micro-frontends.jpg"
        author="Luca Mezzalira"
      />
      <Book
        title="Factfulness"
        href="https://amazon.de/dp/1250123828"
        src="/bookshelf/factfulness.jpg"
        author="Hans Rosling"
      />
      <Book
        title="On Writing Well"
        href="https://amazon.de/dp/0060891548"
        src="/bookshelf/on-writing-well.jpg"
        author="William Zinsser"
      />
      <Book
        title="Working in Public"
        href="https://amazon.de/dp/0578675862"
        src="/bookshelf/working-in-public.jpg"
        author="Nadia Eghbal"
      />
      <Book
        title="Radical Candor"
        href="https://amazon.de/dp/1529038340"
        src="/bookshelf/radical-candor.jpg"
        author="Kim Scott"
      />
      <Book
        title="Death by Meeting"
        href="https://amazon.de/dp/0787968056"
        src="/bookshelf/death-by-meeting.jpg"
        author="Patrick Lencioni"
      />
      <Book
        title="No Rules Rules: Netflix and the Culture of Reinvention"
        href="https://amazon.de/dp/0753553635"
        src="/bookshelf/no-rules-rules.jpg"
        author="Reed Hastings and Erin Meyer"
      />
      <Book
        title="Baustellen der Nation"
        href="https://amazon.de/dp/3550202415"
        src="/bookshelf/baustellen-der-nation.png"
        author="Philip Banse and Ulf Buermeyer"
      />
      <Book
        title="The Software Engineer's Guidebook"
        href="https://amazon.de/dp/908338182X"
        src="/bookshelf/software-engineers-guidebook.jpg"
        author="Gergely Orosz"
      />
      <Book
        title="Rethinking Productivity in Software Engineering"
        href="https://amazon.de/dp/B07RHXW6T7"
        src="/bookshelf/rethinking-productivity.jpg"
        author="Caitlin Sadowski and Thomas Zimmermann"
      />
      <Book
        title="How the Future Works"
        href="https://amazon.de/dp/111987095X"
        src="/bookshelf/how-the-future-works.png"
        author="Brian Elliott"
      />
      <Book
        title="Innovator's Dilemma"
        href="https://amazon.de/dp/1633691780"
        src="/bookshelf/innovators-dilemma.jpg"
        author="Clayton M. Christensen"
      />
      <Book
        title="Project Zero Trust"
        href="https://amazon.de/dp/1119884845"
        src="/bookshelf/zero-trust.png"
        author="George Finney"
      />
      <Book
        title="Spiral Dynamics: Mastering Values, Leadership and Change"
        href="https://amazon.de/dp/1405133562"
        src="/bookshelf/spiral-dynamics.jpg"
        author="Don Beck and Christopher Cowan"
      />
      <Book
        title="Getting to Yes"
        href="https://amazon.de/dp/0143118757"
        src="/bookshelf/getting-to-yes.jpg"
        author="Roger Fisher and William Ury"
      />
      <Book
        title="Your Code as a Crime Scene"
        href="https://amazon.de/dp/B0CSJR386C"
        src="/bookshelf/code-crime-scene.jpg"
        author="Adam Tornhill"
      />
      <Book
        title="Slow Productivity"
        href="https://amazon.de/dp/0593719433"
        src="/bookshelf/slow-productivity.jpg"
        author="Cal Newport"
      />
      <Book
        title="Facilitating Software Architecture"
        href="https://amazon.de/dp/1098151860"
        src="/bookshelf/facilitating-software-architecture.png"
        author="Andrew Harmel-Law"
      />
      <Book
        title="Talking to My Daughter"
        href="https://amazon.de/dp/B07P25G9WL"
        src="/bookshelf/talking-to-my-daughter.jpg"
        author="Yanis Varoufakis"
      />
      <Book
        title="Facilitator's Guide to Participatory Decision-Making"
        href="https://amazon.de/dp/1118404955"
        src="/bookshelf/facilitators-guide.jpg"
        author="Sam Kaner"
      />
      <Book
        title="AI Engineering: Building Applications with Foundation Models"
        href="https://amazon.de/dp/1098166302"
        src="/bookshelf/ai-engineering.jpg"
        author="Chip Huyen"
      />
      <Book
        title="Co-Intelligence: Living and Working with AI"
        href="https://amazon.de/dp/059371671X"
        src="/bookshelf/co-intelligence.jpg"
        author="Ethan Mollick"
      />
      <Book
        title="The Art of Gathering: How We Meet and Why It Matters"
        href="https://amazon.de/dp/0241973848"
        src="/bookshelf/art-of-gathering.jpg"
        author="Priya Parker"
      />
      <Book
        title="The Power of Geography"
        href="https://amazon.de/-/en/Tim-Marshall-ebook/dp/B08SGJ9WHG"
        src="/bookshelf/power-of-geography.jpg"
        author="Tim Marshall"
      />
      <Book
        title="Leading Effective Engineering Teams"
        href="https://amazon.de/dp/109814824X"
        src="/bookshelf/leading-effective-teams.jpg"
        author="Addy Osmani"
      />
      <Book
        title="Wiring the Winning Organization"
        href="https://amazon.de/dp/B0BY39YKBT"
        src="/bookshelf/wiring-winning-organization.jpg"
        author="Gene Kim and Steven J. Spear"
      />
      <Book
        title="Worth Dying For: The Power and Politics of Flags"
        href="https://amazon.de/dp/B08CMF2CQF"
        src="/bookshelf/worth-dying-for.jpg"
        author="Tim Marshall"
      />
      <Book
        title="The Stuff of Thought"
        href="https://www.amazon.com/The-Stuff-Thought-Language-Window/dp/0143114247"
        src="/bookshelf/stuff-of-thought.jpg"
        author="Steven Pinker"
      />
      <Book
        title="Debt: The first 5000 years"
        href="https://www.amazon.com/Debt-First-5-000-Years-ebook/dp/B00513DGIO/ref=sr_1_1?ie=UTF8&qid=1393078126&sr=8-1&keywords=dept+5000"
        src="/bookshelf/debt-5000.jpg"
        author="David Graeber"
      />
      <Book
        title="Outliers - The Story of Success"
        href="https://www.amazon.com/Outliers-Story-Success-Malcolm-Gladwell/dp/0316017930"
        src="/bookshelf/outliers.jpg"
        author="Malcolm Gladwell"
      />
      <Book
        title="Future Perfect"
        href="https://www.amazon.com/Future-Perfect-Case-Progress-Networked/dp/1594631840"
        src="/bookshelf/future-perfect.jpg"
        author="Steven Johnson"
      />
      <Book
        title="Why Nations Fail"
        href="https://www.amazon.com/Why-Nations-Fail-Origins-Prosperity/dp/0307719227"
        src="/bookshelf/why-nations-fail.jpg"
        author="by Daron Acemoglu and James A. Robinson"
      />
      <Book
        title="Discarded Science"
        href="https://www.amazon.com/Discarded-Science-Ideas-That-Seemed/dp/1904332498"
        src="/bookshelf/discarded-science.jpg"
        author="John Grant"
      />
      <Book
        title="A Short History Of Nearly Everything"
        href="https://www.amazon.com/Really-Short-History-Nearly-Everything/dp/0385738102"
        src="/bookshelf/a-short-history.jpg"
        author="Bill Bryson"
      />
      <Book
        title="Predictably Irrational"
        href="https://www.amazon.com/Predictably-Irrational-Revised-Expanded-Decisions/dp/0061353248"
        src="/bookshelf/predictably-irrational.jpg"
        author="Dan Ariely"
      />
      <Book
        title="The Selfish Gene"
        href="https://www.amazon.com/Selfish-Gene-Popular-Science/dp/0192860925"
        src="/bookshelf/selfish-gene.png"
        author=""
      />
      <Book
        title="Influence"
        href="https://www.amazon.com/Influence-Psychology-Persuasion-Business-Essentials/dp/006124189X/"
        src="/bookshelf/influence.jpg"
        author="Robert B. Cialdini"
      />
      <Book
        title="Generation X."
        href="https://www.amazon.com/Generation-X-Tales-Accelerated-Culture/dp/031205436X/"
        src="/bookshelf/generation-x.jpg"
        author="Douglas Coupland"
      />
      <Book
        title="Deep Work"
        href=""
        src="/bookshelf/deep-work.png"
        author="Cal Newport"
      />
      <Book
        title="On the Map"
        href="https://www.amazon.com/Map-Mind-Expanding-Exploration-Notable-Adults/dp/1592407803"
        src="/bookshelf/on-the-map.png"
        author="Simon Garfield"
      />
      <Book
        title="Language Instict"
        href="https://www.amazon.com/Language-Instinct-How-Mind-Creates/dp/1491514981"
        src="/bookshelf/language-instinct.png"
        author="Steven Pinker"
      />
      <Book
        title="The World According to Physics"
        href="https://www.amazon.com/World-According-Physics-Jim-Al-Khalili/dp/0691182302"
        src="/bookshelf/world-physics.png"
        author="Jim Al-Khalili"
      />
      <Book
        title="Utopia for Realists"
        href="https://www.amazon.com/Utopia-Realists-Build-Ideal-World/dp/0316471895"
        src="/bookshelf/utopia-realists.png"
        author="Rutger Bregman"
      />
      <Book
        title="1967: Als Pop unsere Welt für immer veränderte"
        href="https://www.amazon.com/1967-Tom-Segev/dp/3150110866"
        src="/bookshelf/1967.png"
        author="Ernst Hofacker"
      />
      <Book
        title="The Art of Immutable Architecture"
        href="https://www.amazon.com/Art-Immutable-Architecture-Management-Distributed/dp/1484259548"
        src="/bookshelf/immutable-architecture.png"
        author="Michael L. Perry"
      />
      <Book
        title="Software Engineering at Google"
        href="https://www.amazon.com/Software-Engineering-Google-Lessons-Programming/dp/1492082791"
        src="/bookshelf/engineering-google.png"
        author="Titus Winters"
      />
      <Book
        title="Become an Effective Software Engineering Manager"
        href="https://www.amazon.com/Become-Effective-Software-Engineering-Manager/dp/1680507249"
        src="/bookshelf/effective-manager.png"
        author="Dr. James Stanier"
      />
      <Book
        title="Team Topologies: Organizing Business and Technology"
        href="https://www.amazon.com/Team-Topologies-Organizing-Business-Technology/dp/1942788819"
        src="/bookshelf/team-topologies.png"
        author="Matthew Skelton"
      />
      <Book
        title="Punished by Rewards"
        href="https://www.amazon.com/Punished-Rewards-Trouble-Incentive-Praise/dp/0618001816"
        src="/bookshelf/punished-rewards.png"
        author="Alfie Kohn"
      />
      <Book
        title="Thanks for the Feedback"
        href="https://www.amazon.com/Thanks-Feedback-Science-Receiving-Well/dp/0670014664"
        src="/bookshelf/thanks-feedback.png"
        author="Douglas Stone"
      />
      <Book
        title="Crucial Conversations"
        href="https://www.amazon.com/Crucial-Conversations-Talking-Stakes-Second/dp/1469266822"
        src="/bookshelf/crucial-conversations.png"
        author="Joseph Grenny"
      />
      <Book
        title="Move Fast: How Facebook Builds Software"
        href="https://www.amazon.com/Move-Fast-Facebook-Builds-Software-ebook/dp/B093HMJ4KB"
        src="/bookshelf/move-fast.png"
        author="Jeff Meyerson"
      />
      <Book
        title="The Making of a Manager"
        href="https://www.amazon.com/Making-Manager-What-Everyone-Looks/dp/0735219567"
        src="/bookshelf/making-manager.png"
        author="Julie Zhuo"
      />
      <Book
        title="Elixir in Action"
        href="https://www.amazon.com/Elixir-Action-Sa%C5%A1a-Juri-cacute/dp/161729201X"
        src="/bookshelf/elixir-action.png"
        author="Saša Juric"
      />
      <Book
        title="Rust in Action"
        href="https://www.amazon.com/Rust-Action-TS-McNamara/dp/1617294551"
        src="/bookshelf/rust-action.png"
        author="Tim McNamara"
      />
      <Book
        title="Nonviolent Communication: A Language of Life"
        href="https://www.amazon.com/Nonviolent-Communication-Language-Life-Changing-Relationships/dp/189200528X"
        src="/bookshelf/nonviolent-communication.png"
        author="Marshall B. Rosenberg"
      />
      <Book
        title="Simply Said: Communicating Better at Work"
        href="https://www.amazon.com/Simply-Said-Communicating-Better-Beyond/dp/1119285283"
        src="/bookshelf/simply-said.png"
        author="Jay Sullivan"
      />
      <Book
        title="The Manager's Path"
        href="https://www.amazon.com/Managers-Path-Leaders-Navigating-Growth/dp/1491973897"
        src="/bookshelf/managers-path.png"
        author="Camille Fournier"
      />
      <Book
        title="Elastic Leadership: Growing self-organizing teams"
        href="https://www.amazon.com/Elastic-Leadership-Growing-self-organizing-teams/dp/1617293083"
        src="/bookshelf/elastic-leadership.png"
        author="Roy Osherove"
      />
      <Book
        title="User Story Mapping"
        href="https://www.amazon.com/User-Story-Mapping-Discover-Product/dp/1491904909"
        src="/bookshelf/story-mapping.png"
        author="Jeff Patton"
      />
      <Book
        title="The Joy of Clojure"
        href="https://www.manning.com/books/the-joy-of-clojure-second-edition"
        src="/bookshelf/joy-closure.png"
        author="Michael Fogus and Chris Houser"
      />
      <Book
        title="Actionable Agile Metrics for Predictability"
        href="https://www.amazon.com/Actionable-Agile-Metrics-Predictability-Introduction/dp/098643633X"
        src="/bookshelf/agile-metrics.png"
        author="Daniel S. Vacanti"
      />
      <Book
        title="Staff Engineer: Leadership beyond the management track"
        href="https://www.amazon.com/Staff-Engineer-Leadership-beyond-management-ebook/dp/B08RMSHYGG"
        src="/bookshelf/staff-engineer.png"
        author="Will Larson"
      />
      <Book
        title="The Body: A Guide for Occupants"
        href="https://www.amazon.com/Body-Guide-Occupants-Bill-Bryson-ebook/dp/B07M82PNSX/"
        src="/bookshelf/body.png"
        author="Bill Bryson"
      />
      <Book
        title="Uncanny Valley: A Memoir"
        href="https://www.amazon.com/Uncanny-Valley-Memoir-Anna-Wiener-ebook/dp/B07QYHLP97"
        src="/bookshelf/uncanny-valley.png"
        author="Anna Wiener"
      />
      <Book
        title="Sapiens: A Brief History of Humankind"
        href="https://www.amazon.com/gp/product/B00ICN066A/ref=dbs_a_def_rwt_bibl_vppi_i0"
        src="/bookshelf/sapiens.png"
        author="Yuval Noah Harari"
      />
    </section>
  </>
);

export default Bookshelf;
