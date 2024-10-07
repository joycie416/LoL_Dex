"use client";

import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { skin } from "@/types/champions";
import Image from "next/image";

export default function CarouselContainer({
  id,
  skins,
}: {
  id: string;
  skins: skin[] | undefined;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, playOnInit: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {});
  }, [api]);

  return (
    <div className="w-full mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        className="w-full px-10"
      >
        <CarouselContent>
          {skins?.map((skin) => (
            <CarouselItem key={skin.id}>
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`}
                width={1024}
                height={800}
                style={{
                  aspectRatio: "1080/637",
                  width: "100%",
                  height: "auto",
                }}
                alt={skin.name}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
