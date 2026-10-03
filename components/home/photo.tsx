import { media } from "@/data/media";
export function Photo({
  imageKey,
  className = "",
  priority = false,
  sizes = "100vw",
}: {
  imageKey: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const asset = media[imageKey];
  if (!asset) return null;
  return (
    <img
      className={className}
      src={asset.src}
      srcSet={`${asset.src.replace(".webp", "-640.webp")} 640w, ${asset.src} ${asset.width}w`}
      sizes={sizes}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      style={{ objectPosition: asset.focalPoint }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
