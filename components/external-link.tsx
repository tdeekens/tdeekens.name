type TExternalLinkProps = {
  children: React.ReactNode;
  href: string;
};

function ExternalLink(props: TExternalLinkProps): React.FC {
  return (
    <a href={props.href} className="underline hover:no-underline">
      {props.children}
    </a>
  );
}

export default ExternalLink;
