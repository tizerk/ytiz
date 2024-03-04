import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import NavMenu from "./components/NavMenu";
import Home from "./pages/Home";
import FAQ from "./pages/FAQ";
import Socials from "./pages/Socials";
import Changelog from "./pages/Changelog";
import "./App.css";
import Snowfall from "react-snowfall";
import Kofi from "../public/assets/kofi.svg";

function App() {
  const location = useLocation();
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="m-0 box-border flex h-[100svh] flex-col items-center justify-center overflow-hidden overflow-x-hidden bg-slate-950 p-0 font-nunito text-2xl"
    >
      <Snowfall
        color={"#c0abff"}
        snowflakeCount={6}
        radius={[1, 3]}
        speed={[0.1, 1]}
        wind={[-0.1, 0.1]}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, duration: 2.5, ease: "easeOut" }}
        className="absolute	top-[-50%] h-[80%] w-[60%] rounded-full bg-splash	blur-[150px]"
      />
      <NavMenu location={location.pathname} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/socials" element={<Socials />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </AnimatePresence>
      <a
        className="absolute bottom-32 left-10 flex rounded-3xl bg-slate-900 px-5 py-3 text-base font-semibold text-gray-200 transition-all duration-200 hover:scale-110 hover:bg-slate-700 hover:drop-shadow-small_glow sm:bottom-8"
        href="https://ko-fi.com/tizerk"
        target="_blank"
      >
        Support Me
        <img
          src={Kofi}
          className="pl-2 transition-all duration-150 hover:rotate-12"
          alt="Ko-fi Icon"
        />
      </a>
    </motion.main>
  );
}

export default App;
