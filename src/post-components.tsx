import type { TOrderedProps, TUnorderedProps } from '@components/list';
import List from '@components/list';
import type { THeadlineProps, TParagraphProps } from '@components/text';
import Text from '@components/text';

/** Maps markdown elements in posts to the site's typography components. */
export const postComponents = {
  h1: (props: Omit<THeadlineProps, 'as'>) => (
    <Text.Headline as="h1" {...props} />
  ),
  h2: (props: Omit<THeadlineProps, 'as'>) => (
    <Text.Headline as="h2" {...props} />
  ),
  p: (props: TParagraphProps) => <Text.Paragraph {...props} />,
  ul: (props: TUnorderedProps) => <List.Unordered {...props} />,
  ol: (props: TOrderedProps) => <List.Ordered {...props} />,
};
