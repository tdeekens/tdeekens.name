type TBookProps = {
  href: string;
  src: string;
  author: string;
  title: string;
};

import ExternalLink from '@components/external-link';
import Text from '@components/text';
import Image from 'next/image';

function Book(props: TBookProps) {
  return (
    <article className="flex flex-row max-w-xs space-x-4">
      <div>
        <ExternalLink underline={false} href={props.href}>
          <div className="w-20">
            <Image src={props.src} alt={props.title} width="75" height="100" />
          </div>
        </ExternalLink>
      </div>
      <div>
        <ExternalLink underline={true} href={props.href}>
          <Text.Headline as="h3">{props.title}</Text.Headline>
        </ExternalLink>
        <Text.Headline as="h4">by {props.author}</Text.Headline>
      </div>
    </article>
  );
}

export default Book;
