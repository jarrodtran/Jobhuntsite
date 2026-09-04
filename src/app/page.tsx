import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Nav } from "@/components/Nav";
import { Proof } from "@/components/Proof";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Proof />
        <Highlights />
        <Experience />
      </main>
      <Contact />
    </>
  );
}
