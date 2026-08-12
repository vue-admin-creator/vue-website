import type { CSSProperties, ImgHTMLAttributes } from "react";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
};

export default function Image({ src, fill, priority, style, ...props }: ImageProps) {
  const asset = src.startsWith("/") ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src;
  const fillStyle: CSSProperties | undefined = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", ...style }
    : style;
  return <img src={asset} style={fillStyle} loading={priority ? "eager" : "lazy"} {...props} />;
}
