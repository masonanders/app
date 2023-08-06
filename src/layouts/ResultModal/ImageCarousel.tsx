import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import { useRef } from "react";
import loading from "../../assets/svg/loading.svg";
import brokenFile from "../../assets/svg/broken-file.svg";

const ImageCarouselContainer = styled.div`
  column-gap: 8px;
  display: flex;
  /* Reverse because that's the order they show up in the specs */
  flex-direction: row-reverse;
  justify-content: flex-end;
  overflow-x: auto;
  min-height: 144px;

  & > img {
    object-fit: cover;
    width: calc((100% - 16px) / 3);
  }
`;

type ImageWithFallbackProps = Pick<HTMLImageElement, "src" | "alt">;

/** Renders animation while loding `src`. If `src` fails to load, renders a fallback SVG file. */
function ImageWithFallback({ src, alt }: ImageWithFallbackProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  return (
    <img
      ref={imgRef}
      alt={alt}
      src={src}
      style={{ backgroundImage: `url(${loading})` }}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src = brokenFile;
          imgRef.current.style.backgroundImage = "";
        }
      }}
    />
  );
}

type ImageCarouselProps = {
  result: ResultType;
};

export default function ImageCarousel({ result }: ImageCarouselProps) {
  if (!result.images?.length) return null;
  return (
    <ImageCarouselContainer>
      {result.images.map((image, idx) => (
        <ImageWithFallback
          key={idx}
          alt={`${result.name}-${idx}`}
          src={image}
        />
      ))}
    </ImageCarouselContainer>
  );
}
