import { Children, cloneElement } from 'react';
import Text from '@components/text';
import ExternalLink from '@components/external-link';

type TJobHeadlineProps = {
  role: string;
  location: string;
  duration: string;
  href: string;
  company: string;
};

function Headline(props: TJobHeadlineProps) {
  return (
    <Text.Headline as="h3">
      {props.role}{' '}
      <ExternalLink href={props.href}>{props.company}</ExternalLink>{' '}
      {props.location}{' '}
      <span className="xl:float-right xl:font-thin">{props.duration}</span>
    </Text.Headline>
  );
}

type TJobDetailsProps = {
  children: React.ReactElement;
};
function Details(props: TJobDetailsProps) {
  const detailsChildren = Children.map(props.children, (child, index) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    if (child) {
      const clonedChild = cloneElement(child, {
        className: 'sm:my-4 flex-grow flex-1 pr-8',
      });

      return clonedChild;
    }
    return child;
  });

  return (
    <section className="sm:block md:flex flex-row items-stretch text-md">
      {detailsChildren}
    </section>
  );
}

const Job = { Headline, Details };

export default Job;
