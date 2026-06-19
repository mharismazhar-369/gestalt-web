import Navbar from "@/src/components/marketing/navbar";
import Hero from "@/src/components/marketing/hero";
import Services from "@/src/components/marketing/services"; // Import the new room
import Team from "@/src/components/marketing/team";
import Why from "@/src/components/marketing/why";
import What from "@/src/components/marketing/what";
import Where from "@/src/components/marketing/where";
import How from "@/src/components/marketing/how";
import GameArcade from "@/src/components/marketing/gamearcade";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Team />
        <Why />
        <What />
        <Where />
        <How />
        <GameArcade />
              </main>
      <footer className="border-t border-gray-100 py-8 bg-white text-center text-xs text-charcoal/50">
        &copy; {new Date().getFullYear()} Gestalt Technologies (Private) Limited. All rights reserved.
      </footer>
    </>
  );
}