import type { MediaAsset } from "@/types/domain";
export const media: Record<string, MediaAsset> = {
  hero: {
    src: "/images/hero.webp",
    alt: "Pizza sobre uma tábua, com queijo derretido e massa dourada. Fotografia ilustrativa.",
    width: 1600,
    height: 1067,
    focalPoint: "50% 50%",
    isIllustrative: true,
    source:
      "https://www.pexels.com/photo/pizza-with-cheese-served-in-a-restaurant-26575515/",
  },
  serve: {
    src: "/images/serve.webp",
    alt: "Fatia de pizza sendo servida, com queijo derretido. Fotografia ilustrativa.",
    width: 1400,
    height: 933,
    focalPoint: "50% 50%",
    isIllustrative: true,
    source: "https://www.pexels.com/photo/pizza-with-cheese-3731423/",
  },
  slice: {
    src: "/images/slice.webp",
    alt: "Uma fatia de pizza sendo retirada. Fotografia ilustrativa.",
    width: 1200,
    height: 1800,
    focalPoint: "50% 50%",
    isIllustrative: true,
    source:
      "https://www.pexels.com/photo/close-up-of-tasty-cheese-pizza-slice-being-served-31587821/",
  },
};
