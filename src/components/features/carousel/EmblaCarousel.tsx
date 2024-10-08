"use client";

import { fetchArticles } from "@/services/articles";
import { Article, ArticleSearchParams } from "@/types/Article";
import { Metadata } from "@/types/Response";
import {
  EmblaCarouselType,
  EmblaOptionsType,
  EngineType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./ArrowButtons";
import CarouselCard from "./CarouselCard";

type Props = {
  data: {
    data: Article[];
    metadata: Metadata;
  };
  options?: EmblaOptionsType;
};

const EmblaCarousel: FC<Props> = ({ data, options }: Props) => {
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const listenForScrollRef = useRef(true);
  const hasMoreToLoadRef = useRef(true);
  const [slides, setSlides] = useState<Article[]>(data.data);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(
    data.metadata.has_next_page
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    watchSlides: (emblaApi) => {
      const reloadEmbla = (): void => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        const copyEngineModules: (keyof EngineType)[] = [
          "scrollBody",
          "location",
          "offsetLocation",
          "previousLocation",
          "target",
        ];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();

        setLoadingMore(false);
        listenForScrollRef.current = true;
      };

      const reloadAfterPointerUp = (): void => {
        emblaApi.off("pointerUp", reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on("pointerUp", reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const [searchParams, setSearchParams] = useState({
    limit: 10,
    page: 2,
  });

  const getArticles = async (callback?: (res: any) => void) => {
    if (paramsRef.current) {
      const res = await fetchArticles(paramsRef.current);
      if (res) {
        if (callback) callback(res);
        setSlides((prev) => [...(prev ?? []), ...res.data]);
      }
    }
  };

  let lastFetchedPage = searchParams.page;
  let paramsRef = useRef<ArticleSearchParams>();
  paramsRef.current = searchParams;

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return;

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);
      const loadMore = !loadingMore && lastSlideInView;

      if (loadMore) {
        listenForScrollRef.current = false;

        let page = paramsRef.current?.page ?? 0;
        if (lastFetchedPage < page + 1) {
          getArticles((res) => {
            if (res.metadata.has_next_page) {
              setSearchParams((prev) => {
                return {
                  ...prev,
                  page: prev.page + 1,
                };
              });
            } else {
              setHasMoreToLoad(false);
              emblaApi.off("scroll", scrollListenerRef.current);
            }
          });
          lastFetchedPage = page + 1;
        }
      }
      return loadingMore || lastSlideInView;
    });
  }, []);

  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi.on("scroll", scrollListenerRef.current);
    },
    [onScroll]
  );

  useEffect(() => {
    if (!emblaApi) return;
    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", onResize)
    );
  }, [emblaApi, addScrollListener]);

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  useEffect(() => {
    paramsRef.current = searchParams;
  }, [searchParams]);

  return (
    <div className="embla">
      <div
        className="embla__viewport max-h-[220px] sm:max-h-[280px] md:max-h-[360px]"
        ref={emblaRef}
      >
        <div className="embla__container">
          {slides.map((article, idx) => (
            <div className="embla__slide" key={idx}>
              <CarouselCard article={article} />
            </div>
          ))}
          {hasMoreToLoad && (
            <div
              className={"embla-infinite-scroll".concat(
                loadingMore ? " embla-infinite-scroll--loading-more max-h-[220px] sm:max-h-[280px] md:max-h-[360px]" : ""
              )}
            >
              <span className="embla-infinite-scroll__spinner w-16 h-16 md:w-20 md:h-20" />
            </div>
          )}
        </div>
      </div>

      <div className="embla__controls justify-center md:justify-between">
        <div className="embla__buttons ">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
