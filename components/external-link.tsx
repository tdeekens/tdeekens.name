type TExternalLinkProps = {
  underline?: boolean;
  children: React.ReactNode;
  href: string;
};

function ExternalLink(props: TExternalLinkProps) {
  const underline = props.underline ?? true;

  return (
    <a
      href={props.href}
      className={[underline && 'underline', 'hover:no-underline']
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </a>
  );
}

export default ExternalLink;
