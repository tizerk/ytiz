import { Routes, Route } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Socials from "./pages/Socials";
import Changelog from "./pages/Changelog";
import "./App.css";

function App() {
  return (
    <main className="font-league m-0 box-border flex h-screen flex-col items-center justify-center overflow-x-hidden bg-[var(--background)] p-0 text-2xl">
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/socials" element={<Socials />} />
        <Route path="/changelog" element={<Changelog />} />
      </Routes>
    </main>
  );
}

export default App;
