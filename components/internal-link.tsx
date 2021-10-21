import Link from 'next/link';

type TInternalLinkProps = {
  children: React.ReactNode;
  href: string;
  underline?: boolean;
};

function InternalLink(props: TInternalLinkProps) {
  return (
    <Link href={props.href} passHref>
      <a
        className={[props.underline && 'underline', 'hover:no-underline']
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}
      </a>
    </Link>
  );
}
InternalLink.defaultProps = {
  underline: true,
};

export default InternalLink;
