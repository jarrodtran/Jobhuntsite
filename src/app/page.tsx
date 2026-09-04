import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Roles } from "@/components/Roles";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Roles />
        <Experience />
      </main>
      <Contact />
    </>
  );
}
