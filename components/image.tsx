type TImageProps = {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  /** Above-the-fold images should load eagerly. */
  priority?: boolean;
};

/**
 * Plain `<img>` with the subset of the `next/image` API this site used. The
 * site is static and images are pre-sized in `public/`, so there is no
 * optimisation pipeline to route through.
 */
function Image(props: TImageProps) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
      loading={props.priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

export default Image;
