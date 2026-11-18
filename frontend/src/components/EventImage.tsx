import type { EventImageProps } from "../types";

export function EventImage({ src, alt }: EventImageProps) {
  return (
    <div className="event-image-wrap">
      <img className="event-image" src={src} alt={alt} />
    </div>
  );
}
