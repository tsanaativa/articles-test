import EmblaCarousel from "@/components/features/carousel/EmblaCarousel";
import { fetchArticles } from "@/services/articles";
import "@/styles/embla.css";
import { EmblaOptionsType } from "embla-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Newws!",
};

export default async function Home() {
  const OPTIONS: EmblaOptionsType = {
    dragFree: true,
    containScroll: "keepSnaps",
    watchSlides: false,
    watchResize: false,
  };
  const response = await fetchArticles({
    limit: 10,
    page: 1,
  });

  return (
    <div className="w-full max-w-[100%] md:py-5 -mt-1">
      <EmblaCarousel data={response} options={OPTIONS} />
    </div>
  );
}
