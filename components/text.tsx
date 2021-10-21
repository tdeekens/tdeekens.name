type THeadlineLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type THeadlineProps = {
  as: THeadlineLevel;
  pageBreak: boolean;
  children: React.ReactNode;
};

function Headline(props: THeadlineProps) {
  const HeadlineElement = props.as;

  let className;
  switch (props.as) {
    case 'h1':
      className = 'pb-2 mx-auto text-3xl text-center border-b';
      break;
    case 'h2':
      className = 'pt-2 pb-1 mb-1 text-2xl border-b';
      break;
    case 'h3':
      className = 'pb-1 font-bold text-l';
      break;
    case 'h4':
      className = 'pb-1 text-xs text-gray-500';
      break;

    default:
      break;
  }
  if (props.pageBreak) {
    className += ' page-break';
  }

  return (
    <HeadlineElement className={className}>{props.children}</HeadlineElement>
  );
}
Headline.defaultProps = {
  pageBreak: false,
};

export type TParagraphProps = {
  children: React.ReactNode;
};
function Paragraph(props: TParagraphProps) {
  return <p className="py-2">{props.children}</p>;
}

const Text = { Headline, Paragraph };

export default Text;
