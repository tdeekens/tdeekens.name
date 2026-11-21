import Link from 'next/link';

type TInternalLinkProps = {
  children: React.ReactNode;
  href: string;
  underline?: boolean;
  testId?: string;
};

function InternalLink(props: TInternalLinkProps) {
  const underline = props.underline ?? true;

  return (
    <Link
      href={props.href}
      data-test-id={props.testId}
      className={[
        underline &&
          'underline text-link decoration-link-underline hover:text-link-hover',
        'hover:no-underline',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </Link>
  );
}

export default InternalLink;
