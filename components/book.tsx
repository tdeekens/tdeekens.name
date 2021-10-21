type TBookProps = {
  href: string;
  src: string;
  author: string;
  title: string;
};

import Image from 'next/image';
import Text from '@components/text';
import ExternalLink from '@components/external-link';

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
        <Text.Headline as="h3">{props.title}</Text.Headline>
        <Text.Headline as="h4">by {props.author}</Text.Headline>
      </div>
    </article>
  );
}
Book.defaultProps = {};

export default Book;
