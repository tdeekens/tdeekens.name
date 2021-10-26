import Link from 'next/link';

type TInternalLinkProps = {
  children: React.ReactNode;
  href: string;
  underline?: boolean;
  testId?: string;
};

function InternalLink(props: TInternalLinkProps) {
  return (
    <Link href={props.href} passHref>
      <a
        data-test-id={props.testId}
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
