import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Text from '@components/text';
import List from '@components/list';
import ExternalLink from '@components/external-link';
import Job from '@components/job';

const CurriculumVitae: NextPage = () => (
  <>
    <Head>
      <title>Curriculum vitae of Tobias Deekens</title>
    </Head>

    <Text.Headline as="h1">Curriculum vitae</Text.Headline>

    <section className="flex flex-row py-6 text-md">
      <ul className="hidden pt-8 md:block print:block">
        <li>
          German <span>(native speaker)</span>
        </li>
        <li>
          Dutch <span>(native speaker)</span>
        </li>
        <li>
          English <span>(business fluent)</span>
        </li>
        <li>
          Swedish <span>(beginner, A2)</span>
        </li>
      </ul>
      <ul className="flex-grow text-center">
        <li>
          <h3>Tobias Deekens</h3>
        </li>
        <li>Vienna, Austria</li>
        <li>
          <ExternalLink href="mailto:me@tdeekens.name">
            me@tdeekens.name
          </ExternalLink>
        </li>
      </ul>
      <ul className="hidden pt-8 text-right md:block print:block">
        <li>
          <ExternalLink underline={false} href="http://www.github.com/tdeekens">
            <div className="flex items-baseline space-x-2">
              <Image
                src="/github-icon.svg"
                alt="GitHub profile"
                width="13"
                height="13"
              />
              <span>GitHub</span>
            </div>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            underline={false}
            href="http://www.linkedin.com/pub/tobias-deekens/76/b00/197"
          >
            <div className="flex items-baseline space-x-2">
              <Image
                src="/linkedin-icon.svg"
                alt="Linkedin profile"
                width="11"
                height="11"
              />
              <span>LinkedIn</span>
            </div>
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            underline={false}
            href="http://tdeekens.name/curriculum-vitae"
          >
            <div className="flex items-baseline space-x-2">
              <Image
                src="/pencil-icon.svg"
                alt="Link to curriculum vitae"
                width="13"
                height="13"
              />
              <span>tdeekens.name</span>
            </div>
          </ExternalLink>
        </li>
      </ul>
    </section>

    <section className="flex flex-col justify-center align-middle">
      <Text.Headline as="h2">Profile</Text.Headline>
      <article className="py-4">
        <Text.Paragraph>
          Retired basketball player, lousy guitarist but also developer, avid
          teacher and <strong>spontaneous speaker</strong> with a strong
          experience in <strong>frontend development and architecture</strong>.
          Feels <strong>great joy in mentoring</strong> while working with
          diverse teams in agile environments. Likes{' '}
          <strong>early involvement in product ideation</strong> to support
          Product Managers and stakeholders to make more balanced decisions.
          Over time broadened <strong>knowledge of the tech stack</strong> by
          gaining practical experience in building robust and well tested
          frontends while also{' '}
          <strong>working on associated RESTful and GraphQL APIs</strong>.
          Additionally, knowledgeable in{' '}
          <strong>continuous integration and deployment strategies</strong> with
          backing infrastructure such as Prometheus, Kubernetes, Kibana and
          Grafana.
          <br />
          Always has been an Open Source enthusiast and is a contributor to{' '}
          <ExternalLink href="https://github.com/mswjs/msw">
            msw
          </ExternalLink>,{' '}
          <ExternalLink href="https://github.com/cure53/DOMPurify">
            DOMPurify
          </ExternalLink>{' '}
          and creator of{' '}
          <ExternalLink href="https://github.com/tdeekens/flopflip">
            flopflip
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://github.com/tdeekens/promster">
            promster
          </ExternalLink>
          .
        </Text.Paragraph>
      </article>
    </section>

    <section>
      <Text.Headline as="h2">Work Experience</Text.Headline>

      <article className="py-4">
        <Job.Headline
          role="Remote Frontend Tech Lead at"
          location="from Vienna, Austria"
          duration="January 2020 - now"
          company="commercetools"
          href="https://commercetools.com"
        />
        <Text.Paragraph>
          Transitioned into being a <strong>fully remote Tech Lead</strong> of
          all frontend related topics for{' '}
          <strong>six teams across Europe and the United States</strong>.
          Involved in <strong>defining hiring and staffing plans</strong>,
          quarterly planning and cross-team engineering efforts. During
          execution <strong>mentors engineers</strong> across teams in{' '}
          <strong>different areas of the tech stack</strong>. Sets long-term
          vision and goals collaboratively with engineers and product managers
          while guiding and communicating their execution.
        </Text.Paragraph>
        <Text.Paragraph>
          During my time at commercetools the engineering team grew from ten to
          about 70 engineers while the company now has about 360 employees. The
          product, an headless e-commerce API, managed to attract more than 200
          customers. Such as large enterprises from Lego, Volkswagen, Yamaha,
          AT&T, Bang & Olufsen, Quantas and Universal. In the process
          commercetools went through various rounds of funding and a 1.9B dollar
          evaluation.
        </Text.Paragraph>

        <Job.Details>
          <section>
            <Text.Headline as="h3" pageBreak>
              Responsibilities
            </Text.Headline>
            <List.Unordered>
              <List.Item>
                <span className="italic">Hiring:</span> setting and
                communicating long-term staffing and hiring plans for the
                engineering department growing the group from four to sixteen
                engineers.
              </List.Item>
              <List.Item>
                <span className="italic">Onboarding:</span> defining
                organisation wide onboarding goals for frontend engineers in all
                teams. Enabling and easing the continuous growth of the
                department.
              </List.Item>
              <List.Item>
                <span className="italic">Planning:</span> contributed to
                quarterly roadmap planning for six development teams. Aiming to
                help to make delivery as predictable and calm as possible.
              </List.Item>
              <List.Item>
                <span className="italic">Technology:</span> setting technical
                visions for the department enabling long-term stability of
                delivery.
              </List.Item>
            </List.Unordered>
          </section>
          <section>
            <Text.Headline as="h3">Tasks</Text.Headline>
            <List.Unordered>
              <List.Item>
                Guided the implementation of a testing strategy allowing
                continuous deployment of ten independent frontends owned by
                various teams. Increasing the deployment velocity from a weekly
                cadence to multiple times a day.
              </List.Item>
              <List.Item>
                Setup a recurring democratic Open Source donation model for
                projects used by various projects inside the company. Allowing
                commercetools financially support various projects.
              </List.Item>
              <List.Item>
                Managed a budget for all external services such as Sentry,
                CircleCI and Percy used by various teams.
              </List.Item>
              <List.Item>
                Setup and steered a frontend chapter consisting of six members
                meeting to guide execution of cross-cutting technical concerns
                across teams with product managers.
              </List.Item>
              <List.Item>
                Contributed to the long-term structure in the engineering
                department from each team&apos;s responsibilities to roles
                within and across teams.
              </List.Item>
            </List.Unordered>
          </section>
        </Job.Details>
      </article>

      <article className="py-4">
        <Job.Headline
          role="Senior Software Engineer at"
          location="from Vienna, Austria"
          duration="April 2017 - January 2020"
          company="commercetools"
          href="https://commercetools.com"
        />
        <Text.Paragraph>
          Working as a Software Engineer focussing on JavaScript across the
          stack within a cross-functional team building an{' '}
          <strong>internationalised</strong>, customisable web application for{' '}
          <strong>e-commerce</strong> merchants allowing administration of
          complex and large scale product, category, order, discount and
          customer data.
        </Text.Paragraph>
        <Text.Paragraph>
          Working on the frontend and nearby REST & GraphQL APIs of the Merchant
          Center built with{' '}
          <ExternalLink href="https://facebook.github.io/react/">
            React
          </ExternalLink>
          , <ExternalLink href="https://apollographql.com">Apollo</ExternalLink>{' '}
          and <ExternalLink href="https://redux.js.org/">Redux</ExternalLink>{' '}
          while being tested with{' '}
          <ExternalLink href="https://facebook.github.io/jest/">
            Jest
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://github.com/kentcdodds/react-testing-library">
            react-testing-library
          </ExternalLink>{' '}
          and <ExternalLink href="http://cypress.io">Cypress</ExternalLink>.
          Additional infrastructure includes but is not limited to{' '}
          <ExternalLink href="https://webpack.js.org/">webpack</ExternalLink>,{' '}
          <ExternalLink href="https://github.com/prettier/prettier">
            prettier
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://github.com/storybooks/storybook">
            react-storybook
          </ExternalLink>
          . The application follows a sub application architecture allowing easy
          extensions and parallel development and deployments by multiple teams
          in a <b>test-driven and pull request</b> based development environment
          on GitHub. Continuous Integration is performed via{' '}
          <ExternalLink href="https://circleci.com">CircleCI</ExternalLink> with
          development branches being automatically pushed to a{' '}
          <ExternalLink href="kubernetes.io/">Kubernetes</ExternalLink> cluster.
          Additionally supporting the Node.js and JavaScript SDK team.
        </Text.Paragraph>

        <Job.Details>
          <section>
            <Text.Headline as="h3" pageBreak>
              Responsibilities
            </Text.Headline>
            <List.Unordered>
              <List.Item>
                <span className="italic">Onboarding:</span> onboarding frontend
                engineers across 3 cross-function teams.
              </List.Item>
              <List.Item>
                <span className="italic">Hiring:</span> defining code challenges
                and interviewing potential hires.
              </List.Item>
              <List.Item>
                <span className="italic">Code Reviewer:</span> being responsible
                for reviews of both internal and external developers.
              </List.Item>
              <List.Item>
                <span className="italic">Collaboration:</span> defining
                processes and tooling for style guides to support seamless
                design and development collaboration.
              </List.Item>
            </List.Unordered>
          </section>
          <section>
            <Text.Headline as="h3">Tasks</Text.Headline>
            <List.Unordered>
              <List.Item>
                Introducing feature toggling via LaunchDarkly with the
                self-written{' '}
                <ExternalLink href="https://github.com/tdeekens/flopflip">
                  flopflip
                </ExternalLink>{' '}
                library. Allowing more frequent deployments and beta testing of
                features with collaboration with selected customers product
                managers.
              </List.Item>
              <List.Item>
                Migrating Frontend and Node.js monitoring from Influx to{' '}
                <ExternalLink href="https://prometheus.io/">
                  Prometheus
                </ExternalLink>{' '}
                and Grafana with the help of{' '}
                <ExternalLink href="https://github.com/tdeekens/promster">
                  promster
                </ExternalLink>
                . Increasing observability of the platform to increase its
                health but also enable auto scaling.
              </List.Item>
              <List.Item>
                Introducing and advocating{' '}
                <ExternalLink href="https://github.com/prettier/prettier">
                  prettier
                </ExternalLink>{' '}
                for automatic code formatting. Simplifying and speeding up code
                changes while removing discussions around code formatting.
              </List.Item>
              <List.Item>
                Migrating the JavaScript SDK to a{' '}
                <ExternalLink href="https://github.com/rollup/rollup">
                  Rollup
                </ExternalLink>{' '}
                based build via CircleCI. Sppeding up Continuous Integration but
                also enabling an automated release process without needing a
                local machine.
              </List.Item>
              <List.Item>
                Adding a dual deployment workflow to AWS and GCP onto a
                Kubernetes cluster with Helm into six production environments.
              </List.Item>
            </List.Unordered>
          </section>
        </Job.Details>
      </article>

      <article className="py-4">
        <Job.Headline
          role="Tech Lead & JavaScript Developer at"
          location="from Berlin, Germany"
          duration="March 2016 - March 2017"
          company="Brandwatch"
          href="https://brandwatch.com"
        />
        <Text.Paragraph>
          Working as a JavaScript developer within a agile team building great{' '}
          <strong>web-based software</strong> for comprehensive{' '}
          <strong>social network data monitoring</strong> and analysis.
        </Text.Paragraph>
        <Text.Paragraph>
          Working on frontend and related backends powering browser based data
          visualisations of social media data from various sources. Activities
          include the implementation of performant and reusable{' '}
          <strong>visualisation components</strong> using Backbone.js as well as
          maintaining a large, highly interactive and customisable dashboard UI.
          All with a focus on <strong>Continuous Integration</strong> and
          Continuous Delivery in a <strong>test-driven and pull request</strong>{' '}
          based development environment using GitHub and TravisCI.
        </Text.Paragraph>

        <Job.Details>
          <section>
            <Text.Headline as="h3">Responsibilities</Text.Headline>
            <List.Unordered>
              <List.Item>
                <span className="italic">Tech Lead:</span> aligning
                architectural decisions with remote teams.
              </List.Item>
              <List.Item>
                <span className="italic">Teacher:</span> giving small internal
                tech talks to share knowledge.
              </List.Item>
              <List.Item>
                <span className="italic">Code Reviewer:</span> being responsible
                for reviews and all code merged to production.
              </List.Item>
              <List.Item>
                <span className="italic">Backlog:</span> interim Product Owner
                defining the backlog and leading grooming and reviews.
              </List.Item>
            </List.Unordered>
          </section>
          <section>
            <Text.Headline as="h3" pageBreak>
              Tasks
            </Text.Headline>
            <List.Unordered>
              <List.Item>
                Migrating a ~100k SLOC project from RequireJS to webpack.
              </List.Item>
              <List.Item>
                Replacing bower with npm in the main product&apos;s code base.
              </List.Item>
              <List.Item>
                Helping code modding from underscore to lodash.
              </List.Item>
              <List.Item>
                Implementing an Instagram OAuth2 integration allowing to build
                visualisations with Instagram data.
              </List.Item>
            </List.Unordered>
          </section>
        </Job.Details>

        <Text.Paragraph>
          After the layoff of the whole Berlin engineering team I had to
          unexpectedly move on to new opportunities.
        </Text.Paragraph>
      </article>

      <article className="py-4">
        <Job.Headline
          role="Frontend Engineer at"
          location="from Berlin, Germany"
          duration="September 2014 - March 2016"
          company="E-Post Development GmbH"
          href="https://www.deutschepost.de/de/e/epost.html"
        />
        <Text.Paragraph>
          Working as a frontend developer within a cross-functional team
          developing <strong>Single Page Applications</strong>. Furthermore
          focussing on <strong>frontend architecture</strong>, tooling and{' '}
          <strong>testing</strong> to increase{' '}
          <strong>developer experience</strong>.
        </Text.Paragraph>
        <Text.Paragraph>
          Duties include architecting and implementing the next version of the
          E-POST Portal which has been successfully launched. An application
          built of multiple separate frontends, interacting with several backend
          services. Furthermore, helped simplifying and rebuilding registration
          processes while being heavily engaged in UX discussions. A heavy focus
          on developer experience lead to building multiple mostly open sourced
          build-tasks while also maintaining modern development stacks across
          projects.
        </Text.Paragraph>

        <Job.Details>
          <section>
            <Text.Headline as="h3">Responsibilities</Text.Headline>
            <List.Unordered>
              <List.Item>
                <span className="italic">DX:</span> project setup and developer
                tool management.
              </List.Item>
              <List.Item>
                <span className="italic">Workshops:</span> giving frontend
                workshops to mitigate the grap between frontend and backend.
              </List.Item>
              <List.Item>
                <span className="italic">Hiring:</span> defining code challenges
                and interviewing potential hires.
              </List.Item>
            </List.Unordered>
          </section>
          <section>
            <Text.Headline as="h3">Tasks</Text.Headline>
            <List.Unordered>
              <List.Item>
                Improving frontend performance in a legacy UI.
              </List.Item>
              <List.Item>
                Setup of frontend verticals tied to backend (BFF).
              </List.Item>
              <List.Item>
                Managing rollout of new frontends from beta to live.
              </List.Item>
            </List.Unordered>
          </section>
        </Job.Details>

        <Text.Paragraph>
          After the successful launch of the next generation E-POST portal I
          went on to seek working in a more international environment with a
          larger scale product.
        </Text.Paragraph>
      </article>

      <article className="py-2">
        <Job.Headline
          role="Thesis work at"
          location="in Gothenburg, Sweden"
          duration="February 2014 - June 2014"
          company="Ericsson AB"
          href="https://www.ericsson.com/en"
        />
        <Text.Paragraph>
          Investigating Ericsson’s adoption of{' '}
          <strong>organisational structure</strong> in regards to communication
          flow and blockages relating to the empowerment of cross-functional
          teams. A full version be found on{' '}
          <a href="https://github.com/tdeekens/msc-thesis/raw/master/thesis/2nd-submission-examiner/msc-thesis.pdf">
            GitHub
          </a>
          .
        </Text.Paragraph>
      </article>

      <article className="py-2 print:hidden">
        <Job.Headline
          role="Summer job at"
          location="from Munich, Germany"
          duration="July 2013 - September 2013"
          company="Scandio GmbH"
          href="https://www.scandio.de/"
        />
        <Text.Paragraph>
          Scandio GmbH is a medium sized web consultancy firm. Working as a{' '}
          <strong>PHP and JavaScript developer</strong> mainly extending and
          maintaining Scandio’s
          <strong>
            <a href="https://github.com/scandio/">Open Source portfolio</a>
          </strong>
          in <a href="https://github.com/scandio/scandiojs">scandiojs</a>,
          <a href="https://github.com/scandio/lmc">lmvc</a> and
          <a href="https://github.com/scandio/lmvc-modules">lmvc-modules</a>.
          Also engaged in daily development working with <strong>Drupal</strong>{' '}
          and
          <strong>Solr</strong>.
        </Text.Paragraph>
      </article>

      <article className="py-2 print:hidden">
        <Job.Headline
          role="Internship at"
          location="from Hamburg, Germany"
          duration="April 2012 - October 2012"
          company="zweitwerk GmbH"
          href="#"
        />
        <Text.Paragraph>
          Continuation of work after finishing bachelor’s thesis. Evolving the
          previously designed prototype{' '}
          <strong>developing a data administration application</strong>. Gaining
          more experience with modern web development using{' '}
          <strong>HTML5/CSS3</strong>, <strong>JavaScript</strong> and related
          frameworks such asBackbone.js, martionette.js and jQuery. Also partly
          worked on daily development of other products.
        </Text.Paragraph>
      </article>

      <article className="py-2 page-break">
        <Job.Headline
          role="Thesis work at"
          location="from Hamburg, Germany"
          duration="April 2012 - October 2012"
          company="zweitwerk GmbH"
          href="#"
        />
        <Text.Paragraph>
          Combined experience in working at zweitwerk while performing research
          and writing on a <strong>bachelor’s thesis</strong>. The thesis
          entailed a systematic comparison of <strong>NoSQL</strong> (BigTable,
          Dynamo and MongoDB) and <strong>SQL</strong> (MySQL and Oracle)
          databases while performing benchmarks and developing a backend
          angostic <strong>proof-of-concept prototype</strong> of a product
          database for their media asset management system.
        </Text.Paragraph>
      </article>

      <article className="py-2 print:hidden">
        <Job.Headline
          role="Student Assistant at"
          location=""
          duration="May 2009 - April 2010"
          company="Universiät Bamberg"
          href="https://www.uni-bamberg.de"
        />
        <Text.Paragraph>
          Working on project Cadena in designing and implementing a{' '}
          <strong>Software as a Service</strong> supporting elderly care
          services build upon{' '}
          <strong>Adobe Flex®, ActionScript, Flash Media Server and PHP</strong>{' '}
          (Zend backed). The application’s features included video conferences
          between care service and a retiree and administration of clinical
          records. My duties included implementation and{' '}
          <strong>testing of a PHP-based backend</strong> as well as working on
          every part of the frontend. c
        </Text.Paragraph>
      </article>
    </section>

    <section>
      <Text.Headline as="h2">Side Projects</Text.Headline>

      <article className="py-2">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/tdeekens/promster">
            promster
          </ExternalLink>{' '}
          - A Hapi & Express Prometheus exporter
        </Text.Headline>
        <Text.Paragraph>
          A Express middleware (or Hapi plugin) to easily export request timing
          metrics from an Express/Hapi application to Prometheus. The library
          contains few but powerful abilities to configure e.g. labels or to
          perform normalisation on measured values.
        </Text.Paragraph>
      </article>
      <article className="py-2">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/tdeekens/flopflip">
            flopflip
          </ExternalLink>{' '}
          - Real time feature toggling: through LaunchDarkly in React and/or
          Redux via HoCs
        </Text.Headline>
        <Text.Paragraph>
          A library with multiple packages in a mono-repo (maintained with
          lerna) offering Higher Order Components (HoCs) and other utilities to
          enable easy feature toggling of React components (supporting single-
          and multivariate flags). A version for Redux (via a store enhancer)
          integrates nicely with the Redux DevTools. Another standalone React
          version using a broadcasting mechanism allows integrating the library
          within any React application.
        </Text.Paragraph>
      </article>
      <article className="py-2">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/cure53/DOMPurify">
            DOMPurify
          </ExternalLink>{' '}
          - A DOM-only, super-fast, tolerant XSS sanitiser for HTML, MathML and
          SVG
        </Text.Headline>
        <Text.Paragraph>
          Contributor for DOMPurify which is written in JavaScript and works in
          all modern browsers (Safari, Opera (15+), Internet Explorer (10+),
          Spartan, Firefox and Chrome - as well as almost anything else using
          Blink or WebKit). It doesn&apos;t break on IE6 or other legacy
          browsers. It simply does nothing there. Helping to ensure code quality
          for setting up and maintaining continuous integration via TravisCI and
          BrowserStack in 8 different browsers.
        </Text.Paragraph>
      </article>
      <article className="py-2 print:hidden">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/tdeekens/colloq">
            Colloq
          </ExternalLink>{' '}
          - A playground: four NodeJs services with GraphQL in front
        </Text.Headline>
        <Text.Paragraph>
          A pet project with the domain model of a conference and its attendees,
          speakers and organisers. Build with a NodeJs service for each entity
          and with a GraphQL (Apollo Stack) server in front. Technologies
          included in this project is: GraphQL, HapiJs, Ava (testing), XO
          (linting), nodemon, Docker and PM2.
        </Text.Paragraph>
      </article>
      <article className="py-2 print:hidden">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/tdeekens/react-memoise">
            react-memoise
          </ExternalLink>{' '}
          - Declaratively memoise a computation in a React component
        </Text.Headline>
        <Text.Paragraph>
          Expensive computations should be memoised. In React projects
          memoisation is often performed imparatively whereas it could and
          likely should also be declarative within the tree of components.
          React-memoise enables this through an render-prop based API.
        </Text.Paragraph>
      </article>
      <article className="py-2 print:hidden">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/tdeekens/tamesy">
            tamesy
          </ExternalLink>{' '}
          - Tames a set of wild concurrent promises by a concurrency limit
        </Text.Headline>
        <Text.Paragraph>
          Tamesy exposes a map function to map over a set of Promises or a
          iterator factory with a given concurrency. It returns a Promise which
          resolves to an Array whenever all tasks have ben run. The order of
          items is maintained - same as in the list of factory functions passed.
          It is built using webpack as a UMD module and runs on Node.js or in
          the browser as CommonJS, AMD, ESM or as a global.
        </Text.Paragraph>
      </article>
      <article className="py-2 print:hidden">
        <Text.Headline as="h3">
          <ExternalLink href="https://github.com/dactylographsy">
            dactylographsy
          </ExternalLink>{' '}
          - A set of tools generating manifests with fingerprinted assets to be
          injected and cached
        </Text.Headline>
        <Text.Paragraph>
          Every unit of an application can create a{' '}
          <strong>custom manifest</strong> listing all assets it consists of.
          These <strong>assets will be injected</strong> into the page while
          their contents will be cached when they are once loaded. After the{' '}
          <strong>cache (local storage)</strong> is filled it serves all files
          on any subsequent page load to speed up the initial load time. The{' '}
          <strong>caches might be invalidated</strong> at runtime by making a
          comparison between old and eventually new manifest(s).
        </Text.Paragraph>
      </article>
    </section>

    <section>
      <Text.Headline as="h2">Talks, Workshops & Community</Text.Headline>

      <section className="flex-row items-stretch sm:block md:flex text-md">
        <article className="flex-1 flex-grow pr-8 sm:my-4">
          <Text.Headline as="h3">Talks & Posts</Text.Headline>
          <List.Unordered>
            <List.Item>
              <ExternalLink href="https://slides.com/tdeekens/power-to-the-toggles-exended">
                Power to the toggles
              </ExternalLink>
            </List.Item>
            <List.Item>
              <ExternalLink href="https://techblog.commercetools.com/five-practical-tips-when-using-react-hooks-in-production-990a79745229">
                👩🏻 Five practical tips when using React hooks in production
              </ExternalLink>
            </List.Item>
            <List.Item>
              <ExternalLink href="https://techblog.commercetools.com/render-props-apollo-and-formik-build-and-compose-forms-in-react-with-ease-f79a594be239">
                👩🏻‍🍳 Render Props, Apollo and Formik: build and compose forms in
                React with ease 🏄🏾‍
              </ExternalLink>
            </List.Item>
            <List.Item>
              <ExternalLink href="https://techblog.commercetools.com/seven-patterns-by-example-the-many-ways-to-type-radio-in-react-bfe14322bb6f">
                Seven patterns by example: The many ways to
                `type=&quot;radio&quot;` in React
              </ExternalLink>
            </List.Item>
            <List.Item>
              <ExternalLink href="https://techblog.commercetools.com/embracing-real-time-feature-toggling-in-your-react-application-a5e6052716a9">
                Embracing real-time feature toggling in your React application
              </ExternalLink>
            </List.Item>
            <List.Item>
              <ExternalLink href="http://slides.com/tdeekens/css-with-a-hash#/">
                CSS with a hash - from a convention to a hash
              </ExternalLink>{' '}
              <span className="italic">(ThoughtWorks Meetup)</span>
            </List.Item>
            <List.Item>
              <ExternalLink href="http://slides.com/tdeekens/micropuzzling#/">
                Micropuzzling: Implications of slicing web frontends according
                to Microservices
              </ExternalLink>{' '}
              <span className="italic">(microXchg.io)</span>
            </List.Item>
            <List.Item>
              <ExternalLink href="http://slides.com/tdeekens/this-immutable-thing#/">
                Escaping mutability hell - persistent immutable data structures
              </ExternalLink>{' '}
              <span className="italic">(EuroStaff Meetup)</span>
            </List.Item>
            <List.Item>
              <ExternalLink href="http://slides.com/tdeekens/es6-es2015-harmony">
                Transpile all the things from TypeScript
              </ExternalLink>{' '}
              <span className="italic">(Engineering Talk)</span>
            </List.Item>
          </List.Unordered>
        </article>
        <article className="flex-1 flex-grow pr-8 sm:my-4">
          <Text.Headline as="h3">Courses</Text.Headline>
          <List.Unordered>
            <List.Item>
              Shortcut to Tech Leadership: Accelerate Your Journey From Maker to
              Multiplier <span className="italic">(Tech Lead Academy)</span>
            </List.Item>
            <List.Item>
              Time Management for Technical Leaders{' '}
              <span className="italic">(Tech Lead Academy)</span>
            </List.Item>
            <List.Item>
              Functional Programming Principles in Scala{' '}
              <span className="italic">(Coursera)</span>
            </List.Item>
            <List.Item>
              Introduction to Kubernetes <span className="italic">(edX)</span>
            </List.Item>
          </List.Unordered>

          <Text.Headline as="h3">Conferences</Text.Headline>
          <List.Unordered>
            <List.Item>TestJs Summit, JSConf Budapest and KubeCon</List.Item>
            <List.Item>JSConfEU, GraphQL Conf and PromCon</List.Item>
            <List.Item>microXchg, zeit.day and GraphQL-Europe</List.Item>
            <List.Item>Bed-Con and ReactiveConf</List.Item>
            <List.Item>
              Reject.js, Beyond Tellerrand and DotJS & DotCSS
            </List.Item>
          </List.Unordered>
        </article>
      </section>
    </section>

    <section className="print:hidden">
      <Text.Headline as="h2">Extracurricular Activities</Text.Headline>
      <article className="py-2">
        <Text.Headline as="h3">Basketball and Sports</Text.Headline>
        <Text.Paragraph>
          Been actively engaged in teams and clubs since the age of nine playing
          in many cities and countries. Helping clubs, taking over coaching at
          times and just enjoying being around a team while playing at a high
          level. Recently been focussing more on guitar than basketball.
        </Text.Paragraph>
      </article>
      <article className="py-2">
        <Text.Headline as="h3">Guitar and Music</Text.Headline>
        <Text.Paragraph>
          Picked up the guitar as an autodidact learning to play for four years
          now.
        </Text.Paragraph>
      </article>
    </section>

    <section className="print:hidden">
      <article className="py-2">
        <Text.Headline as="h2">University Education</Text.Headline>
        <Text.Headline as="h3">
          Gothenburg University (Chalmers), Sweden{' '}
          <span className="xl:float-right xl:font-thin">
            September 2012 - September 2014
          </span>
        </Text.Headline>
        <Text.Paragraph>
          Master of Science in Software Engineering
        </Text.Paragraph>
      </article>
      <article className="py-2">
        <Text.Headline as="h3">
          University of Keele, United Kingdom{' '}
          <span className="xl:float-right xl:font-thin">
            September 2010 - April 2011
          </span>
        </Text.Headline>
        <Text.Paragraph>Study abroad year</Text.Paragraph>
      </article>
      <article className="py-2">
        <Text.Headline as="h3">
          University of Bamberg, Germany{' '}
          <span className="xl:float-right xl:font-thin">
            October 2007 - March 2012
          </span>
        </Text.Headline>
        <Text.Paragraph>
          Bachelor of Science in Information Systems
        </Text.Paragraph>
      </article>
    </section>
  </>
);

export default CurriculumVitae;
