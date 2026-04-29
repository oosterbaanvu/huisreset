import Hero from "./components/Hero";
import TwoPaths from "./components/TwoPaths";
import ResetCheckForm from "./components/ResetCheckForm";
import Benefits from "./components/Benefits";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <TwoPaths />
      <Benefits />
      <ResetCheckForm />
      <Footer />
    </main>
  );
}
