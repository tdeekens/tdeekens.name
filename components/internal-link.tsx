import Link from 'next/link';

type TInternalLinkProps = {
  children: React.ReactNode;
  href: string;
};

function InternalLink(props: TInternalLinkProps) {
  return (
    <Link href={props.href} passHref>
      <a className="underline hover:no-underline">{props.children}</a>
    </Link>
  );
}

export default InternalLink;
