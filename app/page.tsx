import { Hero } from "@/components/home/hero";
import { Featured } from "@/components/home/featured";
import { Editorial } from "@/components/home/editorial";
import { Gallery } from "@/components/home/gallery";
import { Location } from "@/components/home/location";
export default function Home() {
  return (
    <>
      <Hero />
      <Featured />
      <Editorial />
      <Gallery />
      <Location />
    </>
  );
}
