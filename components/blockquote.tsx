type TBlockquoteProps = {
  children: React.ReactNode;
};

function Blockquote(props: TBlockquoteProps) {
  return (
    <blockquote className="border-solid border-l-4 border-gray-300 pl-4">
      {props.children}
    </blockquote>
  );
}

export default Blockquote;
