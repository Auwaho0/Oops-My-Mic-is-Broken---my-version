import paper from "@/assets/paper.png";
import { HeaderBar } from "@/widgets/headerBar";
import { Footer } from "@/widgets/footer";
import { HomePage } from "@/pages/home";

export function App() {
  return (
    <div className="relative min-h-screen text-ink">
      {/* Crumpled paper texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${paper})` }}
        aria-hidden="true"
      />

      <HeaderBar />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
