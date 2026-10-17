'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';

type LoadingImageProps = ImageProps & {
  /** Extra classes for the loading overlay backdrop */
  loaderClassName?: string;
};

function Loader({ className = '' }: { className?: string }) {
  return (
    <span
      className={`absolute inset-0 z-[1] flex items-center justify-center bg-neutral-100 ${className}`}
      aria-hidden
    >
      <span className="image-loader" />
    </span>
  );
}

/** next/image with a brand spinner while the asset loads */
export default function LoadingImage({
  className = '',
  alt,
  onLoad,
  fill,
  loaderClassName = '',
  ...props
}: LoadingImageProps) {
  const [loaded, setLoaded] = useState(false);

  const image = (
    <Image
      alt={alt}
      fill={fill}
      className={`${className} transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      {...props}
    />
  );

  if (fill) {
    return (
      <>
        {!loaded && <Loader className={loaderClassName} />}
        {image}
      </>
    );
  }

  return (
    <span className="relative inline-block max-w-full">
      {!loaded && <Loader className={loaderClassName} />}
      {image}
    </span>
  );
}

/** Native <img> with the same loading spinner */
export function LoadingImg({
  className = '',
  onLoad,
  loaderClassName = '',
  wrapperClassName = 'relative inline-block max-w-full',
  alt = '',
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  loaderClassName?: string;
  wrapperClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const node = imgRef.current;
    if (node?.complete && node.naturalWidth > 0) setLoaded(true);
  }, [props.src]);

  return (
    <span className={wrapperClassName}>
      {!loaded && <Loader className={loaderClassName} />}
      <img
        ref={imgRef}
        alt={alt}
        className={`${className} transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        {...props}
      />
    </span>
  );
}
