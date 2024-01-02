import Image, { ImageProps } from "next/image";

interface LogoProps extends ImageProps {}

export function Logo({ src, alt, ...ImageProps }: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      priority
      sizes="100vw"
      {...ImageProps}
    />
  );
}
