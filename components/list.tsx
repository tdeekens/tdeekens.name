import { Children, cloneElement } from 'react';

type TUnorderedProps = {
  children: React.ReactNode;
};

function Unordered(props: TUnorderedProps): React.FC {
  const itemElements = Children.map(props.children, (child, index) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    if (child?.type && child.type.displayName === Item.displayName) {
      const clonedChild = cloneElement(child, {});

      return clonedChild;
    }
    return child;
  });

  return <ul className="list-disc pl-8">{itemElements}</ul>;
}

type TItemProps = {
  children: React.ReactNode;
};
function Item(props: TItemProps): React.FC {
  return <li className="py-1">{props.children}</li>;
}
Item.displayName = 'Item';

const List = { Unordered, Item };

export default List;
