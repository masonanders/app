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

type ImageProps = {
  alt: string;
  image: string;
};

/** If an image fails to load, this component renders `null` instead to prevent it from taking up space. */
function Image({ alt, image }: ImageProps) {
  const [error, setError] = useState(false);
  if (error) return null;
  return <img alt={alt} src={image} onError={() => setError(true)} />;
}

type ImageCarouselProps = {
  result: ResultType;
};

export default function ImageCarousel({ result }: ImageCarouselProps) {
  if (!result.images?.length) return null;
  return (
    <ImageCarouselContainer>
      {result.images.map((image, idx) => (
        <Image key={idx} alt={`${result.name}-${idx}`} image={image} />
      ))}
    </ImageCarouselContainer>
  );
}
