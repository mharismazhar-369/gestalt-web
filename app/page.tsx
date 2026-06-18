import Navbar from "@/src/components/marketing/navbar";
import Hero from "@/src/components/marketing/hero";
import Services from "@/src/components/marketing/services"; // Import the new room
import Why from "@/src/components/marketing/why";
import What from "@/src/components/marketing/what";
import Where from "@/src/components/marketing/where";
import How from "@/src/components/marketing/how";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Services />
        <Why />
        <What />
        <Where />
        <How />
      </main>
      <footer className="border-t border-gray-100 py-8 bg-white text-center text-xs text-charcoal/50">
        &copy; {new Date().getFullYear()} Gestalt Technologies (Private) Limited. All rights reserved.
      </footer>
    </>
  );
}