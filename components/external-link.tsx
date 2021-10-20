type TExternalLinkProps = {
  underline: boolean;
  children: React.ReactNode;
  href: string;
};

function ExternalLink(props: TExternalLinkProps) {
  return (
    <a
      href={props.href}
      className={[props.underline && 'underline', 'hover:no-underline']
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </a>
  );
}
ExternalLink.defaultProps = {
  underline: true,
};

export default ExternalLink;
