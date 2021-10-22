type TTrackProps = {
  id: string;
  artist: string;
  song: string;
};

import Text from '@components/text';
import ExternalLink from '@components/external-link';

function Track(props: TTrackProps) {
  return (
    <article className="max-w-xs">
      <ExternalLink underline={false} href={`https://youtu.be/${props.id}`}>
        <div>
          <Text.Headline as="h3">{props.song}</Text.Headline>
          <Text.Headline as="h4">by {props.artist}</Text.Headline>
        </div>
      </ExternalLink>
    </article>
  );
}
Track.defaultProps = {};

export default Track;
