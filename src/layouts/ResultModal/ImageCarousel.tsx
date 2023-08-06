import styled from "styled-components";
import { ResultType } from "../../data/sample-data";
import { useState } from "react";

const ImageCarouselContainer = styled.div`
  column-gap: 8px;
  display: flex;
  /* Reverse because that's the order they show up in the specs */
  flex-direction: row-reverse;
  justify-content: flex-end;
  overflow-x: auto;

  & > img {
    object-fit: cover;
    width: calc((100% - 16px) / 3);
  }
`;

type ImageCarouselProps = {
  result: ResultType;
};

/** Tracks `img` load-state and hides individual `img` if error or pending.
 *  Renders null if no images or all images error out to prevent reserving space for an empty `div`. */
export default function ImageCarousel({ result }: ImageCarouselProps) {
  const [imgLoadState, setImgLoadState] = useState<
    ("pending" | "loaded" | "error")[]
  >(new Array(result.images?.length ?? 0).fill("pending"));

  if (
    !result.images?.length ||
    imgLoadState.every((state) => state === "error")
  )
    return null;
  return (
    <ImageCarouselContainer>
      {result.images.map((image, idx) => (
        <img
          key={idx}
          alt={`${result.name}-${idx}`}
          src={image}
          onError={() =>
            setImgLoadState((prev) =>
              prev.map((state, i) => (i === idx ? "error" : state))
            )
          }
          onLoad={() =>
            setImgLoadState((prev) =>
              prev.map((state, i) => (i === idx ? "loaded" : state))
            )
          }
          {...(imgLoadState[idx] !== "loaded" && {
            style: { display: "none" },
          })}
        />
      ))}
    </ImageCarouselContainer>
  );
}
