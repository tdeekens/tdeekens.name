import { Children, cloneElement } from 'react';

export type TUnorderedProps = {
  children: Array<React.ReactElement>;
};

function Unordered(props: TUnorderedProps) {
  const itemElements = Children.map(props.children, (child, index) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    // @ts-expect-error
    if (child?.type && child.type.displayName === Item.displayName) {
      const clonedChild = cloneElement(child, {});

      return clonedChild;
    }
    return child;
  });

  return <ul className="list-disc pl-8">{itemElements}</ul>;
}

export type TItemProps = {
  children: React.ReactNode;
};
function Item(props: TItemProps) {
  return <li className="py-1">{props.children}</li>;
}
Item.displayName = 'Item';

const List = { Unordered, Item };

export default List;
