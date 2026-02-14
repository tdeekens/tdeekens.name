import { type ReactElement, Children, cloneElement } from 'react';
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
      <span className="italic font-thin xl:float-right xl:not-italic">
        {props.duration}
      </span>
    </Text.Headline>
  );
}

type TJobDetailsProps = {
  children: JSX.Element | JSX.Element[];
};
function Details(props: TJobDetailsProps) {
  const detailsChildren = Children.map(props.children, (child) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    if (child) {
      const clonedChild = cloneElement(
        child as ReactElement<Record<string, unknown>>,
        {
          className: 'sm:my-4 flex-grow flex-1 pr-8',
        },
      );

      return clonedChild;
    }
    return child;
  });

  return (
    <section className="flex-row items-stretch sm:block md:flex text-md">
      {detailsChildren}
    </section>
  );
}

const Job = { Headline, Details };

export default Job;
