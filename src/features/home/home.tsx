import { Header } from "./header";
import { TItleSection } from "./judul";
import { Navigation } from "./navigation";

export function Home(){
  return (
    <>
      <Navigation className="fixed top-0 left-0 right-0 z-50"/>
      <Header />
      <TItleSection />
    </>
  )
}