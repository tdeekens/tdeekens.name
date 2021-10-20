type THeadlineLevel = 'h1' | 'h2' | 'h3';
export type THeadlineProps = {
  as: THeadlineLevel;
  children: React.ReactNode;
};

function Headline(props: THeadlineProps) {
  const HeadlineElement = props.as;

  let className;
  switch (props.as) {
    case 'h1':
      className = 'mx-auto pb-2 text-3xl border-b text-center';
      break;
    case 'h2':
      className = 'text-2xl pt-2 pb-1 mb-1 border-b';
      break;
    case 'h3':
      className = 'text-l font-bold pb-1';
      break;

    default:
      break;
  }
  return (
    <HeadlineElement className={className}>{props.children}</HeadlineElement>
  );
}

export type TParagraphProps = {
  children: React.ReactNode;
};
function Paragraph(props: TParagraphProps) {
  return <p className="py-2">{props.children}</p>;
}

const Text = { Headline, Paragraph };

export default Text;
