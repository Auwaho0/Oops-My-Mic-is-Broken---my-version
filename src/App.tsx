import paper from "@/assets/paper.png";
import HeaderBar from "@/widgets/headerBar/HeaderBar";
import Hero from "@/widgets/hero/Hero";
import Ticker from "@/components/Ticker";
import Soundboard from "@/widgets/soundboard/Soundboard";
import Generator from "@/components/Generator";
import About from "@/widgets/about/About";
import Footer from "@/components/Footer";
import Menu from "./widgets/menu/Menu";

export default function App() {


  return (
    <div className="relative min-h-screen text-ink">
      {/* мятая бумага */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${paper})` }}
        aria-hidden="true"
      />

      <HeaderBar />

      <main>
        <Menu />
        <Hero />
        <About />
        <Ticker />
        <Soundboard />
        <Generator />

      </main>

      <Footer />

    </div>
  );
}
