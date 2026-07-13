import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatIsTutorly from "./components/WhatIsTutorly";
import ForSchools from "./components/ForSchools";
import HowItWorks from "./components/HowItWorks";
import BecomeTutor from "./components/BecomeTutor";
import Footer from "./components/Footer";
import MascotCompanion from "./components/MascotCompanion";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatIsTutorly />
        <ForSchools />
        <HowItWorks />
        <BecomeTutor />
      </main>
      <Footer />
      <MascotCompanion />
    </>
  );
}
