type TBlockquoteProps = {
  children: React.ReactNode;
};

function Blockquote(props: TBlockquoteProps) {
  return (
    <blockquote className="pl-4 border-l-4 border-line-soft border-solid">
      {props.children}
    </blockquote>
  );
}

export default Blockquote;
