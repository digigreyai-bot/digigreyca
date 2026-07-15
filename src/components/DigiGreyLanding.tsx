import { Nav } from "./landing/Nav";
import { Hero } from "./landing/Hero";
import { About } from "./landing/About";
import { Services } from "./landing/Services";
import { Industries } from "./landing/Industries";
import { Technologies } from "./landing/Technologies";
import { Why } from "./landing/Why";
import { Recognition } from "./landing/Recognition";
import { Process } from "./landing/Process";
import { Results } from "./landing/Results";
import { CaseStudies } from "./landing/CaseStudies";
import { CaseStudyDetail } from "./landing/CaseStudyDetail";
import { FAQ } from "./landing/FAQ";
import { Contact } from "./landing/Contact";
import { Footer } from "./landing/Footer";

export default function DigiGreyLanding() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Services />
      <Industries />
      <Technologies />
      <Why />
      <Recognition />
      <Process />
      <Results />
      <CaseStudies />
      <CaseStudyDetail />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
