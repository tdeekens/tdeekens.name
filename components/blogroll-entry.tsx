import ExternalLink from '@components/external-link';
import Text from '@components/text';

type TBlogrollEntryProps = {
  title: string;
  href: string;
  author: string;
  teaser: string;
  tags?: string[];
};

function BlogrollEntry(props: TBlogrollEntryProps) {
  return (
    <article className="flex flex-col space-y-1">
      <Text.Headline as="h3">
        <ExternalLink href={props.href}>{props.title}</ExternalLink>
      </Text.Headline>
      <div className="flex items-baseline gap-2">
        <Text.Headline as="h4">by {props.author}</Text.Headline>
        {props.tags && props.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {props.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded-full border border-gray-300 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <Text.Paragraph>{props.teaser}</Text.Paragraph>
    </article>
  );
}

export default BlogrollEntry;
