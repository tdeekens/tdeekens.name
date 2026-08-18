import { Children, cloneElement } from 'react';

export type TUnorderedProps = {
  children: React.ReactElement[];
};

function Unordered(props: TUnorderedProps) {
  const itemElements = Children.map(props.children, (child) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    // @ts-expect-error type doesn't exist
    if (child?.type && child.type.displayName === Item.displayName) {
      const clonedChild = cloneElement(child, {});

      return clonedChild;
    }
    return child;
  });

  return <ul className="pl-8 list-disc">{itemElements}</ul>;
}

export type TOrderedProps = {
  children: React.ReactElement[];
};
function Ordered(props: TOrderedProps) {
  const itemElements = Children.map(props.children, (child) => {
    // NOTE: Allowing to intersperse other elements than `Item`.
    // @ts-expect-error type doesn't exist
    if (child?.type && child.type.displayName === Item.displayName) {
      const clonedChild = cloneElement(child, {});

      return clonedChild;
    }
    return child;
  });

  return <ol className="pl-8 list-decimal">{itemElements}</ol>;
}

export type TItemProps = {
  children: React.ReactNode;
};
function Item(props: TItemProps) {
  return <li className="py-1">{props.children}</li>;
}
Item.displayName = 'Item';

const List = { Unordered, Ordered, Item };

export default List;
